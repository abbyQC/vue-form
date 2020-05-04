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
        if (field) {
            delete this.errors[field];
            return;
        }

        this.errors = {};
    }

}
class Form {
    constructor(data) {
        this.originalData = data;
        for (let field in data) {
            this[field] = data[field];
        }
        this.errors = new Errors();
    }
    data() {
        /*  let data = Object.assign({}, this);
         delete data.originalData;
         delete data.errors; */
        let data = {};
        for (let property in this.originalData) {
            data[property] = this[property];

        }
        return data;
    }
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }
        this.errors.clear();
    }
    post(url) {
        this.submit('POST', url);
    }
    delete(url) {
        return this.submit('DELETE', url);
    }
    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data)
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data.errors);
                    reject(error.response.data);
                })

        });
    };

    onSuccess(data) {
        alert(data.message);

        this.reset();
    }
    onFail(errors) {

        this.errors.record(errors);
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
            this.form.submit('post', '/projects')
                .then(data => alert('Handling it'))
                .catch(errors => console.log(errors));
            //alert("submitting");

        },
    },
});
