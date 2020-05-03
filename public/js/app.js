class Errors {
    constructor() {
        this.errors = {};
    }
    has(field) {
        return this.errors.hasOwnProperty(field);
    }
    any() {
        return Object.keys(this.errors).length > 0;
    }
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }
    record(errors) {
        this.errors = errors;
    }
    clear(field) {
        if (field)
            delete this.errors[field];
        this.errors = {};
    }

}
class Form {
    constructor(data) {
        this.originaldata = data;
        for (let field in data) {
            this[field] = data[field];
        }
        this.errors = new Errors;
    }
    reset() {
        for (let field in originaldata) {
            this[field] = '';
        }
    }
    data() {
        Object.assign({}, this);
    }
    /* post(url) {
        this.submit('POST', url);
    } */
    submit(requestType, url) {
        // axios
        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this))
    }
    onSuccess(response) {
        alert(response.data.message);
        this.errors.clear;
    }
    onFail(error) {
        this.errors.record(error.response.data.errors);
    }
}
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
            this.form.submit('POST', '/projects');
            //alert("submitting");

        },
        onSuccess(response) {
            alert(response.data.message);
            form.reset();
        }
    },
});
