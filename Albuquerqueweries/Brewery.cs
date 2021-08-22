using System;
using System.Web;
using Newtonsoft.Json;

namespace BrewerySearch
{
    public class Brewery
    {
        private bool? _promoted;
        
        [JsonProperty("Id")]
        public string Id { get; set; }
        [JsonProperty("name")]
        public string BreweryName { get; set; }
        [JsonProperty("brewery_type")]
        public string BreweryType { get; set; }
        [JsonProperty("street")]
        public string StreetAddress { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("state")]
        public string State { get; set; }
        [JsonProperty("postal_code")]
        public string Zip { get; set; }
        [JsonProperty("latitude")]
        public string Latitude { get; set; }
        [JsonProperty("longitude")]
        public string Longitude { get; set; }
        [JsonProperty("website_url")]
        public string Website { get; set; }
        public bool Promoted
        {
            get
            {
                if (_promoted.HasValue) { return _promoted.Value; }
                Random r = new Random();
                _promoted = (r.Next(1, 100) > 75);
                return _promoted.Value;
            }
        }
        public string CityStateZip
        {
            get
            {
                return City + ", " + State + " " + Zip;
            }
        }
        public string PromotedText
        {
            get
            {
                if (Promoted) { return " PROMOTED "; }
                return "";
            }
        }
    }
}
