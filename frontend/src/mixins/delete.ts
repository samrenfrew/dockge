import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            hideDelete: localStorage.hideDelete,
        };
    },

    watch: {
        hideDelete(value) {
            localStorage.hideDelete = value;
        },
    },

    async created() {
        if (!this.hideDelete) {
            localStorage.hideDelete = false;
        }
    },
});
