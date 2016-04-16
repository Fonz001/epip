using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using epiphany.Models;

namespace epiphany.Repositories
{
    public class LinkRepository
    {
        private static readonly IList<Link> Links;

        static LinkRepository()
        {
            Links = new List<Link>
            {
                new Link
                {
                    Url = "https://getwildcard.co/",
                    Slack = "@bits-michelangelo",
                    User = "@bits-splinter",
                    CreateDateTime = DateTime.Now,
                    Title = "Wildcard – Meet people that matter at events and places",
                    Comment = "Check this awesome app!"
                },
                new Link
                {
                    Url = "http://www.lucrasoft.nl/",
                    Slack = "#general",
                    User = "@bits-donatello",
                    CreateDateTime = DateTime.Now,
                    Title = "Techknowledgy Matters - Lucrasoft ICT Groep",
                    Comment =
                        "Look at this awesome company! Now opening a new office in Zwolle! #Zwolle #Awesome #Movin"
                },
                new Link
                {
                    Url = "http://playground.tensorflow.org/",
                    Slack = "@bits-michelangelo",
                    User = "@bits-donatello",
                    CreateDateTime = DateTime.Now,
                    Title = "A Neural Network Playground",
                    Comment = "Wow, freaking vet!"
                },
                //new Link
                //{
                //    Url = "http://www.nytimes.com/2016/04/17/magazine/the-minecraft-generation.html?_r=0",
                //    Slack = "@bits-michelangelo",
                //    User = "@bits-donatello",
                //    CreateDateTime = DateTime.Now,
                //    Title = "The Minecraft Generation",
                //    Comment = "Vanavond potje minecraft? :-D"
                //},
                new Link
                {
                    Url = "http://www.scylladb.com/2016/04/14/io-scheduler-1/",
                    Slack = "#bits-please",
                    User = "@bits-donatello",
                    CreateDateTime = DateTime.Now,
                    Title =
                        "Designing a Userspace Disk I/O Scheduler for Modern Datastores: the Scylla example (Part&nbsp;1)",
                    Comment = "Hebben jullie hier wat aan?"
                },
                new Link
                {
                    Url = "http://www.movin.io/nl/home/",
                    Slack = "#general",
                    User = "@bits-donatello",
                    CreateDateTime = DateTime.Now,
                    Title = "Home - Movin",
                    Comment = "Check deze boys!"
                },
                new Link
                {
                    Url = "http://www.east-hackathon.nl/",
                    Slack = "#doorbell",
                    User = "@bits-donatello",
                    CreateDateTime = DateTime.Now,
                    Title = "East Hackathon &#124; First eastern dutch hackathon",
                    Comment = "Ze hebben er echt wat vets van gemaakt! Vooral de jury is vet!"
                }
            };
        }

        public void Store(Link link)
        {
            Links.Add(link);
        }

        public List<Link> All()
        {
            return Links.ToList();
        }
    }
}
