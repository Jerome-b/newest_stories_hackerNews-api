using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nextechapp.Models;
using Newtonsoft.Json;
using Microsoft.Extensions.Caching.Memory;

namespace Nextechapp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewStoriesController : ControllerBase
    {
        // dependency injection
        private IMemoryCache _memoryCache;

        // store newest stories
        List<NewStoriesModel> newStories = new List<NewStoriesModel>();

        // base url of Hacker News Api
        private string url = "https://hacker-news.firebaseio.com/v0/";

        // method to get the newest stories from Hacker News Api of which response is an array: https://hackernews.api-docs.io/v0/live-data/new-and-top-stories
        public async Task<string> LoadNews()
        {
            string data;
            using var client = new HttpClient();

            // only return a string array of number corresponding of the new stories' id
            if (!_memoryCache.TryGetValue("newestStories_array_id", out data))
            {
                HttpResponseMessage httpResponseMessage = await client.GetAsync(url + "newstories.json");
                if (httpResponseMessage.StatusCode == HttpStatusCode.OK)
                {
                    var content = httpResponseMessage.Content;
                    data = await content.ReadAsStringAsync();
                    var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(60));
                    _memoryCache.Set("newestStories_array_id", data, cacheEntryOptions);
                }
                else
                {
                    throw new Exception(httpResponseMessage.ReasonPhrase);
                }

            }
            return _memoryCache.Get("newestStories_array_id").ToString();
        }

        // method to get the corresponding stories from the array of ids retrieved in LoadNews()
        public async Task<List<NewStoriesModel>> LoadAllNews()
        {
            using var client = new HttpClient();

            if (!_memoryCache.TryGetValue("newestStories_withContent", out newStories))
            {
                newStories = new List<NewStoriesModel>();

                // deserialize the result from LoadNews() method in order to get each id
                List<string> storiesId = JsonConvert.DeserializeObject<List<string>>(_memoryCache.Get("newestStories_array_id").ToString());

                // loop through the ids and make a request for each of them
                foreach (var i in storiesId)
                {
                    HttpResponseMessage httpResponseMessage = await client.GetAsync(url + "item/" + i + ".json");
                    if (httpResponseMessage.StatusCode == HttpStatusCode.OK)
                    {
                        var content = httpResponseMessage.Content;
                        NewStoriesModel result = await content.ReadAsAsync<NewStoriesModel>();
                        newStories.Add(result);
                        _memoryCache.Set("newestStories_withContent", newStories);

                    }
                    else
                    {
                        throw new Exception(httpResponseMessage.ReasonPhrase);
                    }
                }
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(50));
                _memoryCache.Set("newestStories_withContent", newStories, cacheEntryOptions);

       
            }

            return newStories;
        }

        public NewStoriesController(IMemoryCache cache)
        {
            _memoryCache = cache;
        }

        [HttpGet]
        public async Task<string> GetAsync()
        {
            await LoadNews();
            await LoadAllNews();
            string output = JsonConvert.SerializeObject(_memoryCache.Get("newestStories_withContent"), new JsonSerializerSettings()
            {
                // remove null values
                NullValueHandling = NullValueHandling.Ignore
            });
            return output;

        }

    }
}
