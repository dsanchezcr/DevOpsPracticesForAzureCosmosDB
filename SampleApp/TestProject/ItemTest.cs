using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using WebApp.Data;
using Xunit;
using System;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using WebApp.Pages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApp.Tests
{
    public class ItemTest
    {

        private WebAppContext GetDbContext()
        {
            var builder = new DbContextOptionsBuilder<WebAppContext>()
                // Use Cosmos DB Emulator for tests
                .UseCosmos("AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==", "SampleDatabase");
            var dbContext = new WebAppContext(builder.Options);
            dbContext.Database.EnsureCreated();
            return dbContext;
        }

        [Fact]
        public async Task Test_OnPostAsync_ReturnsRedirectToPage()
        {
            // Arrange
            var dbContext = GetDbContext();
            var items = new List<Item>();
            
            // Act
            var CreateModel = new CreateModel(dbContext);
            var result = await CreateModel.OnPostAsync();

            // Assert
            Assert.IsType<RedirectToPageResult>(result);
            var RedirectToPageResult = (RedirectToPageResult)result;
            Assert.Equal("/Index", RedirectToPageResult.PageName);
        }
    }
}