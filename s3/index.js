const S3 = require('aws-sdk/clients/s3')
const s3 = new S3({apiVersion: '2006-03-01'})


const webSiteBucketParams = {
    Bucket: '',

    WebsiteConfiguration: {
        IndexDocument: {
          Suffix: ''
        },
        ErrorDocument: {
          Key: ''
        },
    }
}


webSiteBucketParams.Bucket = process.argv[2]
webSiteBucketParams.WebsiteConfiguration.IndexDocument.Suffix = process.argv[3]
webSiteBucketParams.WebsiteConfiguration.ErrorDocument.Key = process.argv[4]



const getBucketNames = s3.listBuckets({}, (err,data) => {
}).promise().then(data => {
    return data.Buckets.map(bucket => bucket.Name)
})
 

//pass in bucketname
const newWebsiteBucket = () => {
    getBucketNames.then((data) =>{
    if(data.indexOf(process.argv[2]) === -1){
        s3.createBucket({Bucket: process.argv[2]}, (err, data) =>{
            if(err) {console.log(err)}
            else {
                console.log(data)
            }
        })
            
        } else if(data.includes(process.argv[2])) {
            s3.putBucketWebsite(webSiteBucketParams, (err, data) => {
                if(err) { console.log(err) }
                else{
                    console.log(data)
                }
            })
        }
    })

}

newWebsiteBucket()
