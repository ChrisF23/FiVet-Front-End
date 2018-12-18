export default {
    props: ["id"],
    data: () => ({
        initialCliente: null,
        cliente : null,
        editing: false
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
                    this.initialCliente = JSON.parse(JSON.stringify(response.body));
                    console.log(this.cliente);
                    //console.log(JSON.stringify(response.body));
                });
        },

        edit() {
            this.editing = true;
        },
          
        save() {
            this.editing = false;
            if(this.validate){
                this.$http.put('http://localhost:3000/api/clientes/', this.cliente).then(
                    function(res) {
                        this.initialCliente = res.body;
                        console.log(res);
                    }
                );
                this.editing = false;
            }else{
                console.log("error de modelo.");
            }
        },

        validate(){
            return true;
        },

        remove() {
            this.$http.delete('http://localhost:3000/api/clientes/'+this.cliente.id).then(
                res => {
                    this.$router.push({name:'clientes'});
                    console.log("deleted");
                }
            )
        },

        cancel() {
            this.cliente = JSON.parse(JSON.stringify(this.initialCliente));
            this.editing = false;
        }
    }
}