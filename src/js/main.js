document.addEventListener("DOMContentLoaded", function() {
    var gallery = document.querySelector(".gallery");
    for (var i = 0; i < 100; i++){
        gallery.appendChild(createLazyImg());
    }
    lazylodr(gallery);
});

function createLazyImg(src, alt, title) {
    let img = document.createElement('img');
    img.className = "lazy";
    img.style.width = "640px";
    img.style.height = "480px";
    if (src != null) 
        img.src = src
    else 
        img.setAttribute("data-src", "https://source.unsplash.com/random/" + Math.floor(600 + Math.random() * 100));
    (alt != null) && (img.alt = alt)
    (title != null) && (img.title = title)
    return img;
}

function lazylodr(rootNode) {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {

        var _onIntersection = function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            })
        }

        var config = {
            root: rootNode,
            rootMargin: '50px 0px',
            treshold: 0.01
        };

        let lazyImageObserver = new IntersectionObserver(_onIntersection, config);

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        //  todo: add second, more compatible method here lol
    }
}

