using System;

namespace epiphany.Models
{
    public class Link
    {
        public string Url { get; set; } //"http://example.xxx",

        public DateTime CreateDateTime { get; set; }
        public string Title { get; set; } // "Title van de pagina (aanpasbaar?)",
        public string Comment { get; set; } // "Kijk eens wat een goed pagina!",
        public string Slack { get; set; } // "#bits-please" || "@bits-leonardo", // general default
        /// <summary>
        /// Submitting user
        /// </summary>
        public string User  { get; set; } // "@bits-donatello"
    }
}