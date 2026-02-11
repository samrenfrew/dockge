import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            system: (window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light",
            userTheme: localStorage.theme,
            statusPageTheme: "light",
            forceStatusPageTheme: false,
            path: "",
            isMobile: false,
        };
    },

    computed: {
        theme() {
            if (this.userTheme === "auto") {
                return this.system;
            }
            return this.userTheme;
        },

        isDark() {
            return this.theme === "dark";
        }
    },

    watch: {
        "$route.fullPath"(path) {
            this.path = path;
        },

        userTheme(to, from) {
            localStorage.theme = to;
        },

        styleElapsedTime(to, from) {
            localStorage.styleElapsedTime = to;
        },

        theme(to, from) {
            document.body.classList.remove(from);
            document.body.classList.add(this.theme);
            this.updateThemeColorMeta();
        },

        userHeartbeatBar(to, from) {
            localStorage.heartbeatBarTheme = to;
        },

        heartbeatBarTheme(to, from) {
            document.body.classList.remove(from);
            document.body.classList.add(this.heartbeatBarTheme);
        }
    },

    mounted() {
        // Default Dark
        if (! this.userTheme) {
            this.userTheme = "dark";
        }

        document.body.classList.add(this.theme);
        this.updateThemeColorMeta();

        // Mobile screen detection (max-width: 550px) - shared across all views
        this._mobileQuery = window.matchMedia("(max-width: 550px)");
        this.isMobile = this._mobileQuery.matches;
        this._mobileQueryListener = (e: MediaQueryListEvent) => { this.isMobile = e.matches; };
        this._mobileQuery.addEventListener("change", this._mobileQueryListener);
    },
    unmounted() {
        if (this._mobileQuery) {
            this._mobileQuery.removeEventListener("change", this._mobileQueryListener);
        }
    },

    methods: {
        /**
         * Update the theme color meta tag
         * @returns {void}
         */
        updateThemeColorMeta() {
            if (this.theme === "dark") {
                document.querySelector("#theme-color").setAttribute("content", "#161B22");
            } else {
                document.querySelector("#theme-color").setAttribute("content", "#5cdd8b");
            }
        }
    }
});

