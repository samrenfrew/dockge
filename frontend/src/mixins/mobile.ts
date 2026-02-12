import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            isMobile: false,
        };
    },

    mounted() {
        // Mobile screen detection (max-width: 767px) - shared across all views
        this._mobileQuery = window.matchMedia("(max-width: 767px)");
        this.isMobile = this._mobileQuery.matches;
        this._mobileQueryListener = (e: MediaQueryListEvent) => {
            this.isMobile = e.matches;
        };
        this._mobileQuery.addEventListener("change", this._mobileQueryListener);
    },
    unmounted() {
        if (this._mobileQuery) {
            this._mobileQuery.removeEventListener(
                "change",
                this._mobileQueryListener,
            );
        }
    },
});
