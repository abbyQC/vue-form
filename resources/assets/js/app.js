//require('./bootstrap');
import Form from '/Users/changqiu/Desktop/vue-form/resources/assets/js/core/Form.js';

new Vue({
    el: "#app",
    data: {
        form: new Form({
            name: "",
            description: "",
        }),
    },
    methods: {
        onSubmit() {
            this.form.post('/projects')
                .then(response => alert('Press to continue'))
                .catch(errors => console.log(errors));
            //alert("submitting");

        },
    },
});
