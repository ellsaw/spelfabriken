export default function bufferToImg(buffer){
    return `data:image/webp;base64,${buffer.toString('base64')}`;
}