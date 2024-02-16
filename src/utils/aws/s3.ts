import {S3Client, PutObjectCommand, ObjectCannedACL} from '@aws-sdk/client-s3'
import {getEnvVar} from "../database/conection/get.var.env";
import fs from "node:fs";





const s3Client = new S3Client(
    {
        region:getEnvVar('AWS_BUCKET_REGION'),
        credentials:{
            accessKeyId:getEnvVar('ACCESS_KEY'),
            secretAccessKey:getEnvVar('SECRET_ACCESS_KEY')
        }
    }
);

export async function uploadFile(file: any){
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: getEnvVar('AWS_BUCKET_NAME'),
        Key: file.name,
        Body: stream,
        ACL: 'public-read' as ObjectCannedACL
    }
    const command = new  PutObjectCommand(uploadParams)
    return await s3Client.send(command)

}
