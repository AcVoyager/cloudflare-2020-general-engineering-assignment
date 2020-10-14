addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
* Respond with hello worker text
* @param {Request} request
*/

async function handleRequest(request) {
  
  var link0 = {
    name: "Google",
    url: "https://www.google.com/",
  };

  var link1 = {
    name: "Bing",
    url: "https://www.bing.com/",
  };

  var link2 = {
    name: "Baidu",
    url: "https://www.baidu.com/",
  };

  var links = [link0, link1, link2];
  for(let i = 0; i < links.length; i++){
    links[i] = JSON.stringify(links[i]);
  }

  const url = new URL(request.url);
  var url_path = url.pathname;
  // console.log(url_path);

  class LinksTransformer {
    constructor(links) {
      this.links = links
      console.log("constructed");
    }
    
    async element(element) {
      // Your code
      console.log(`Incoming element: ${element.tagName}`);
    }
  }

  if(url_path == "/links")
    return new Response(links, {
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
  else{
    // return new Response(null, {
    //   headers: { "content-type": "application/json;charset=UTF-8" },
    // })
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
    const res = await fetch("https://static-links-page.signalnerve.workers.dev", init);
    // return new Response(await res.text(), init);
    return new HTMLRewriter().on("div", new LinksTransformer(links)).transform(res);
  }
     


}
