using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

namespace BrewerySearch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrewerySearchController : ControllerBase
    {
        private readonly ILogger<BrewerySearchController> _logger;

        public BrewerySearchController(ILogger<BrewerySearchController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Brewery> Get()
        {
            string brewSearchURL = "https://api.openbrewerydb.org/breweries?by_city=albuquerque&per_page=50";
            int page = 1;
            List<Brewery> resultList;
            List<Brewery> allResults;

            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                string responseBody = client.GetAsync(brewSearchURL).Result.Content.ReadAsStringAsync().Result;
                resultList = JsonConvert.DeserializeObject<List<Brewery>>(responseBody);
            }

            allResults = resultList;

            while (resultList.Count == 50)
            {
                page += 1;
                string brewPageParam = "&page=" + page.ToString();
                using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
                {
                    string responseBody = client.GetAsync(brewSearchURL + brewPageParam).Result.Content.ReadAsStringAsync().Result;
                    resultList = JsonConvert.DeserializeObject<List<Brewery>>(responseBody);
                }
                allResults.AddRange(resultList);
            }

            return allResults.OrderByDescending(brewery => brewery.Promoted);
        }
    }
}
