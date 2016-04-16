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
            if (!string.IsNullOrEmpty(link.Url))
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

            if (!string.IsNullOrEmpty(user))
            {
                allLinks = allLinks.Where(l => (l.Slack == user || l.Slack.StartsWith("#") || string.IsNullOrEmpty(l.Slack)) && l.User != user).ToList();
            }

            if (allLinks.Any())
            {
                var item = RandomItem(allLinks);

                return Json(item);
            }

            return Json(new List<Link>());

        }

        private static Link RandomItem(IList<Link> allLinks)
        {
            var random = new Random();
            var index = random.Next(0, allLinks.Count);
            return allLinks[index];
        }
    }
}
