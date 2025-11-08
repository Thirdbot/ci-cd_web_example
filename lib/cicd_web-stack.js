"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CicdWebStack = void 0;
const cdk = __importStar(require("aws-cdk-lib/core"));
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const path_1 = require("path");
const fs_1 = require("fs");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
class CicdWebStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const deployment_bucket = new aws_s3_1.Bucket(this, 'WebBucket', { removalPolicy: cdk.RemovalPolicy.DESTROY });
        const destination_web = (0, path_1.join)(__dirname, '..', 'webapp', 'vite-project', 'build');
        if (!(0, fs_1.existsSync)(destination_web)) {
            console.warn(`Warning: The directory ${destination_web} does not exist. Make sure the web application is built before deploying the stack.`);
            return;
        }
        const originIdentity = new aws_cloudfront_1.OriginAccessIdentity(this, 'OriginAccessIdentity');
        deployment_bucket.grantRead(originIdentity);
        const distribution = new aws_cloudfront_1.Distribution(this, 'CICDWebDistribution', {
            defaultBehavior: {
                origin: aws_cloudfront_origins_1.S3BucketOrigin.withOriginAccessControl(deployment_bucket)
            },
            defaultRootObject: 'index.html'
        });
        new aws_s3_deployment_1.BucketDeployment(this, 'DeployWeb', {
            destinationBucket: deployment_bucket,
            sources: [aws_s3_deployment_1.Source.asset(destination_web)],
            distribution: distribution
        });
        new cdk.CfnOutput(this, 'DistributionDomainName', {
            value: distribution.distributionDomainName,
        });
    }
}
exports.CicdWebStack = CicdWebStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ljZF93ZWItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaWNkX3dlYi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUF3QztBQUV4QywrQ0FBMEM7QUFDMUMsK0JBQTRCO0FBQzVCLDJCQUFnQztBQUNoQywrREFBZ0Y7QUFDaEYsK0VBQXFHO0FBQ3JHLDhDQUE4QztBQUM5QyxxRUFBeUU7QUFFekUsTUFBYSxZQUFhLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDekMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGlCQUFpQixHQUFHLElBQUksZUFBTSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsRUFBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2xHLE1BQU0sZUFBZSxHQUFHLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMsSUFBQSxlQUFVLEVBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixlQUFlLHFGQUFxRixDQUFDLENBQUM7WUFDN0ksT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLHFDQUFvQixDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO1FBQzdFLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUczQyxNQUFNLFlBQVksR0FBRyxJQUFJLDZCQUFZLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ2pFLGVBQWUsRUFBQztnQkFDZCxNQUFNLEVBQUUsdUNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQzthQUNsRTtZQUNELGlCQUFpQixFQUFFLFlBQVk7U0FDaEMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDO1lBQ3BDLGlCQUFpQixFQUFFLGlCQUFpQjtZQUNwQyxPQUFPLEVBQUMsQ0FBQywwQkFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2QyxZQUFZLEVBQUMsWUFBWTtTQUMxQixDQUFDLENBQUE7UUFFRixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ2hELEtBQUssRUFBRSxZQUFZLENBQUMsc0JBQXNCO1NBQzNDLENBQ0EsQ0FBQztJQUVKLENBQUM7Q0FDRjtBQW5DRCxvQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWIvY29yZSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7QnVja2V0fSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IERpc3RyaWJ1dGlvbiwgT3JpZ2luQWNjZXNzSWRlbnRpdHkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgeyBTM0J1Y2tldE9yaWdpbiwgUzNPcmlnaW4sIFMzU3RhdGljV2Vic2l0ZU9yaWdpbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnMnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuaW1wb3J0IHsgQnVja2V0RGVwbG95bWVudCwgU291cmNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnQnO1xuXG5leHBvcnQgY2xhc3MgQ2ljZFdlYlN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgZGVwbG95bWVudF9idWNrZXQgPSBuZXcgQnVja2V0KHRoaXMsJ1dlYkJ1Y2tldCcse3JlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1l9KTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbl93ZWIgPSBqb2luKF9fZGlybmFtZSwnLi4nLCd3ZWJhcHAnLCd2aXRlLXByb2plY3QnLCdidWlsZCcpO1xuXG4gICAgaWYgKCFleGlzdHNTeW5jKGRlc3RpbmF0aW9uX3dlYikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgV2FybmluZzogVGhlIGRpcmVjdG9yeSAke2Rlc3RpbmF0aW9uX3dlYn0gZG9lcyBub3QgZXhpc3QuIE1ha2Ugc3VyZSB0aGUgd2ViIGFwcGxpY2F0aW9uIGlzIGJ1aWx0IGJlZm9yZSBkZXBsb3lpbmcgdGhlIHN0YWNrLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbklkZW50aXR5ID0gbmV3IE9yaWdpbkFjY2Vzc0lkZW50aXR5KHRoaXMsICdPcmlnaW5BY2Nlc3NJZGVudGl0eScpXG4gICAgZGVwbG95bWVudF9idWNrZXQuZ3JhbnRSZWFkKG9yaWdpbklkZW50aXR5KVxuXG5cbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgRGlzdHJpYnV0aW9uKHRoaXMsICdDSUNEV2ViRGlzdHJpYnV0aW9uJywge1xuICAgICAgZGVmYXVsdEJlaGF2aW9yOntcbiAgICAgICAgb3JpZ2luOiBTM0J1Y2tldE9yaWdpbi53aXRoT3JpZ2luQWNjZXNzQ29udHJvbChkZXBsb3ltZW50X2J1Y2tldClcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0Um9vdE9iamVjdDogJ2luZGV4Lmh0bWwnXG4gICAgfSlcblxuICAgIG5ldyBCdWNrZXREZXBsb3ltZW50KHRoaXMsJ0RlcGxveVdlYicse1xuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IGRlcGxveW1lbnRfYnVja2V0LFxuICAgICAgc291cmNlczpbU291cmNlLmFzc2V0KGRlc3RpbmF0aW9uX3dlYildLFxuICAgICAgZGlzdHJpYnV0aW9uOmRpc3RyaWJ1dGlvblxuICAgIH0pXG4gICAgXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0Rpc3RyaWJ1dGlvbkRvbWFpbk5hbWUnLCB7XG4gICAgICB2YWx1ZTogZGlzdHJpYnV0aW9uLmRpc3RyaWJ1dGlvbkRvbWFpbk5hbWUsXG4gICAgfVxuICAgICk7XG5cbiAgfVxufVxuIl19