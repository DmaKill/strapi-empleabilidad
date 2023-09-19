import SimpleSchema from 'simpl-schema';

export const DocumentoPublicoSchema = new SimpleSchema({
    id: Number,
    name: String,
    url: String,
    mime: String,
    ext: String
});


