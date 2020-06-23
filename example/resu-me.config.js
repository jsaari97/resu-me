module.exports = {
  languages: ["en"],

  main: [
    {
      component: "header",
      props: {
        name: "John Doe",
        birthDate: "1970-01-01",
        email: "john.doe@example.local",
        phone: "+358 000 000000",
        address: "Awesome Street 25",
        postalAddress: "Funky Town",
        zipCode: "00110",
      },
    },
    {
      component: "section",
      props: {
        title: "Profile",
      },
      children: [
        {
          component: "section",
          props: {
            title: "Child",
          },
          children: [
            {
              component: "section",
              props: {
                title: "Nested Child #1",
              },
            },
            {
              component: "section",
              props: {
                title: "Nested Child #2",
              },
              children: [
                {
                  component: "section",
                  props: {
                    title: "Nested Child #1",
                  },
                },
                {
                  component: "section",
                  props: {
                    title: "Nested Child #2",
                  },
                },
                {
                  component: "section",
                  props: {
                    title: "Nested Child #3",
                  },
                },
              ],
            },
            {
              component: "section",
              props: {
                title: "Nested Child #3",
              },
            },
          ],
        },
      ],
    },
    {
      component: require("./src/custom-section.svelte"),
      props: {
        title: "Profile",
      },
    },
  ],
};
