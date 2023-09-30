export default [
  {
    method: 'GET',
    path: '/custom-admin-page',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
];
