(function () {
    'use strict';

    var root = document.documentElement;
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // ---- Theme toggle ----
    function currentTheme() {
        var forced = root.getAttribute('data-theme');
        if (forced === 'dark' || forced === 'light') return forced;
        return darkQuery.matches ? 'dark' : 'light';
    }

    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        var syncLabel = function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            toggle.setAttribute('aria-label', 'Switch to ' + next + ' mode');
        };
        syncLabel();
        toggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncLabel();
        });
        if (darkQuery.addEventListener) darkQuery.addEventListener('change', syncLabel);
    }

    // ---- Active nav link while scrolling ----
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    if ('IntersectionObserver' in window && links.length) {
        var byId = {};
        links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
                var link = byId[entry.target.id];
                if (link) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'true');
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        Object.keys(byId).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) observer.observe(el);
        });
    }

    // ---- Hero video: respect reduced motion, pause when off-screen ----
    var video = document.getElementById('bg-video');
    if (video) {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        var applyMotionPref = function () {
            if (reduceMotion.matches) {
                video.removeAttribute('autoplay');
                video.pause();
            }
        };
        applyMotionPref();
        if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', applyMotionPref);

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                if (reduceMotion.matches) return;
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var p = video.play();
                        if (p && p.catch) p.catch(function () {});
                    } else {
                        video.pause();
                    }
                });
            }).observe(video);
        }
    }
})();
