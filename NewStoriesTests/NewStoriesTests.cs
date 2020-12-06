using Microsoft.Extensions.Caching.Memory;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Nextechapp.Controllers;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Nextechapp.Models;

namespace NewStoriesTests
{
    [TestClass]
    public class NewStoriesTests
    {
        IMemoryCache _cache;

        [TestMethod]
        public void ShouldCallApi_NewestStories()
        {
            // Arrange
            var _controller = new NewStoriesController(_cache);

            // Act
            var result = _controller.LoadNews();

            // Assert
            Assert.IsInstanceOfType(result, typeof(Task<string>));
        }

        [TestMethod]
        public void ShouldFetch_AllNewestStoriesData()
        {
            // Arrange
            var _controller = new NewStoriesController(_cache);

            // Act
            var result = _controller.LoadAllNews();

            // Assert
            Assert.IsInstanceOfType(result, typeof(Task<List<NewStoriesModel>>));
        }
    }
}
