const initialState = {
    classInfo: {

        Class1: [{


            'Name': 'Tony',

            'Maths': 80,

            'Science': 50,

            'English': 80,

            'Geography': 70,

            'History': 50,

            'Status': 'pass'

        },

        {

            'Name': 'Samuel',

            'Maths': 80,

            'Science': 80,

            'English': 80,

            'Geography': 80,

            'History': 80,

            'Status': 'fail'

        }],

        Class2: [{

            'Name': 'John',

            'Maths': 50,

            'Science': 50,

            'English': 40,

            'Geography': 60,

            'History': 30,

            'Status': 'fail'

        },

        {

            'Name': 'Tinkle',

            'Maths': 25,

            'Science': 40,

            'English': 30,

            'Geography': 50,

            'History': 30,

            'Status': 'fail'

        }],

        Class3: [{

            'Name': 'Angel',

            'Maths': 80,

            'Science': 70,

            'English': 80,

            'Geography': 70,

            'History': 50,

            'Status': 'pass'

        }]
    }
}

export default (state = initialState, { type, payLoad }) => {
    switch (type) {
        default:
            return state;
    }
}