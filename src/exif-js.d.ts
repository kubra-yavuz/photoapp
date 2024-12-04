declare module 'exif-js' {
    const EXIF: {
        getData: (img: any, callback: Function) => void;
        getAllTags: (img: any) => any;
    };
    export default EXIF;
}