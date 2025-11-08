import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import {Bucket} from 'aws-cdk-lib/aws-s3';
import { join } from 'path';
import { existsSync } from 'fs';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin, S3Origin, S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export class CicdWebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deployment_bucket = new Bucket(this,'WebBucket',{removalPolicy: cdk.RemovalPolicy.DESTROY});
    const destination_web = join(__dirname,'..','..','webapp','vite-project','dist');

    if (!existsSync(destination_web)) {
      console.warn(`Warning: The directory ${destination_web} does not exist. Make sure the web application is built before deploying the stack.`);
      return;
    }

    const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity')
    deployment_bucket.grantRead(originIdentity)


    const distribution = new Distribution(this, 'CICDWebDistribution', {
      defaultBehavior:{
        origin: S3BucketOrigin.withOriginAccessControl(deployment_bucket)
      },
      defaultRootObject: 'index.html'
    })

    new BucketDeployment(this,'DeployWeb',{
      destinationBucket: deployment_bucket,
      sources:[Source.asset(destination_web)],
      distribution:distribution
    })
    
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
    }
    );

  }
}
