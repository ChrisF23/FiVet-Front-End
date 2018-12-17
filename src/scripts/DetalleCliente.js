export default {
    props: ["id"],
    data: () => ({
        cliente : {}
    }),

    created() {
        //this.id = this.$route.params.id;
        this.initialize()
    },

    methods: {
        initialize() {
            this.$http.get('http://localhost:3000/api/clientes/'+this.id)
                .then(function (response) {
                    this.cliente = response.body;
                    console.log(JSON.stringify(response.body));
                });
        }

        
    }
}