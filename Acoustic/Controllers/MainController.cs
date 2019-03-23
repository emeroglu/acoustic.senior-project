using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace Acoustic.Controllers
{
    public class MainController : Controller
    {
        private static Dictionary<string, string> cache;

        [HttpGet]
        public string Index()
        {
            string html = "";

            FileStream stream = new FileStream(Server.MapPath("/Files/index.html"), FileMode.Open, FileAccess.Read);
            StreamReader reader = new StreamReader(stream);

            html = reader.ReadToEnd();

            reader.Close();
            reader.Dispose();

            stream.Close();
            stream.Dispose();

            Response.ContentType = "text/html";

            return html;
        }

        [HttpGet]
        public string Sync(string folder, string file,string extension)
        {
            string url = "http://v-sync.s3-website-eu-west-1.amazonaws.com/3080ffeb-52c3-4c8b-8917-8a4a1e3b17d4/contents";

            url += "/" + folder;
            url += "/" + file;
            url += "." + extension;

            if (cache == null)
                cache = new Dictionary<string, string>();

            if (cache.ContainsKey(url))
                return cache[url];

            HttpClient client = new HttpClient();

            string response = client.GetStringAsync(url).GetAwaiter().GetResult().ToString();

            cache[url] = response;

            return response;
        }
    }
}