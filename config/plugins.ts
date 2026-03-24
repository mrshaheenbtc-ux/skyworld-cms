export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: 'skyworld',
          use_filename: true,
          unique_filename: true,
        },
        uploadStream: {
          folder: 'skyworld',
        },
        delete: {},
      },
    },
  },
});