using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using epiphany.Models;
using epiphany.Repositories;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace epiphany.Controllers
{

    public class PublishController : Controller
    {
        private readonly LinkRepository _linkrepository;

        public PublishController()
        {
            _linkrepository = new LinkRepository();
        }

        [Route("share")]
        public IActionResult Share(Link link)
        {
            if (!string.IsNullOrEmpty(link.Url) && !string.IsNullOrEmpty(link.Slack))
            {
                link.CreateDateTime = DateTime.Now;

                _linkrepository.Store(link);
            }

            return Json(_linkrepository.All());

        }

        [Route("get")]
        public ActionResult Get(string user)
        {
            var allLinks = _linkrepository.All();

            user = "@"+user.Trim('@');

            Link responseLink = null;

            if (!string.IsNullOrEmpty(user))
            {

                
                responseLink = allLinks.Where(l => l.Slack == user && !l.ViewedBy.Contains(user)).OrderByDescending(l => l.CreateDateTime).FirstOrDefault();

                if (responseLink == null)
                {
                    responseLink =
                        allLinks.Where(
                            l =>
                                (l.Slack.StartsWith("#") || string.IsNullOrEmpty(l.Slack)) && l.User != user &&
                                !l.ViewedBy.Contains(user))
                            .OrderByDescending(l => l.CreateDateTime).FirstOrDefault();
                }


                
            }

            if (responseLink == null)
            {
                responseLink = RandomItem(allLinks.Where(l => l.Slack == user || l.Slack.StartsWith("#")).ToList());
            }

            UpdateViewed(responseLink, user);
            return Json(responseLink);

        }

        private static void UpdateViewed(Link item, string user)
        {
            if (!item.ViewedBy.Contains(user))
            {
                item.ViewedBy.Add(user);
            }
        }

        private static Link RandomItem(IList<Link> allLinks)
        {
            var random = new Random();
            var index = random.Next(0, allLinks.Count);
            return allLinks[index];
        }
    }
}
