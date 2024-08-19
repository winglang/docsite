import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid'
import { AWSPlatformIcon, AzurePlatformIcon, GCPPlatformIcon, TerraformIcon, CDKIcon } from '../PlatformIcons';
import CodeBlock from '@theme/CodeBlock';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
};

const codeExample = `bring cloud;

let inputs = new cloud.Bucket() as "Inputs";
let processed = new cloud.Bucket() as "Outputs";

let counter = new cloud.Counter();

new cloud.Function(inflight () => {
  // Process each object in the input bucket
  for key in inputs.list() {
    // Get the object data from storage
    let contents = inputs.getJson(key);
    // Extract some information
    let cInfo = contents["customerInfo"];
    // Atomically increment a counter
    let index = counter.inc();
    // Store the processed information
    processed.putJson("processed-{index}.json", cInfo);
  }
});`

const platforms = [
  {
    name: 'AWS with Terraform',
    platform: 'aws-tf',
    output: {
      example: `{
  "provider": {
    "aws": [{}]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "Queue-SetConsumer0_CloudwatchLogGroup_56C2891C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "Queue-SetConsumer0_CloudwatchLogGroup_56C2891C"
          }
        },
        "name": "/aws/lambda/Queue-SetConsumer0-c83c303c",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "Counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/Default",
            "uniqueId": "Counter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-Counter-c824ef62"
      }
    },
    "aws_iam_role": {
      "Queue-SetConsumer0_IamRole_7F9ED9ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRole",
            "uniqueId": "Queue-SetConsumer0_IamRole_7F9ED9ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Queue-SetConsumer0_IamRolePolicy_0299B5AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "Queue-SetConsumer0_IamRolePolicy_0299B5AB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"\${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"\${aws_s3_bucket.Bucket.arn}\",\"\${aws_s3_bucket.Bucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"\${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "\${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "\${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "Queue_EventSourceMapping_8332F7DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/EventSourceMapping",
            "uniqueId": "Queue_EventSourceMapping_8332F7DC"
          }
        },
        "batch_size": 1,
        "event_source_arn": "\${aws_sqs_queue.Queue.arn}",
        "function_name": "\${aws_lambda_function.Queue-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      }
    },
    "aws_lambda_function": {
      "Queue-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/Default",
            "uniqueId": "Queue-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_1357ca3a": "\${aws_s3_bucket.Bucket.bucket}",
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "\${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Queue-SetConsumer0-c83c303c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Queue-SetConsumer0-c83c303c",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "\${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "\${aws_s3_bucket.Code.bucket}",
        "s3_key": "\${aws_s3_object.Queue-SetConsumer0_S3Object_2AD0A795.key}",
        "timeout": "\${aws_sqs_queue.Queue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
        }
      }
    },
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "Queue-SetConsumer0_S3Object_2AD0A795": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/S3Object",
            "uniqueId": "Queue-SetConsumer0_S3Object_2AD0A795"
          }
        },
        "bucket": "\${aws_s3_bucket.Code.bucket}",
        "key": "asset.c83c303c1266dbb851c70f1219bd171134fd688af4.2e29a6166bb14ecb333ff4191f26b302.zip",
        "source": "assets/Queue-SetConsumer0_Asset_370CBC69/0AE82898D5DFE9649D2A0B82943882EB/archive.zip"
      }
    },
    "aws_sqs_queue": {
      "Queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Default",
            "uniqueId": "Queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c822c726",
        "visibility_timeout_seconds": 30
      }
    }
  },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "aws": {
        "source": "aws",
        "version": "5.56.1"
      }
    }
  }
}`,
      metastring: 'title="AWS Terraform (main.tf.json)"',
    },
    platformIcon: () => <div className='flex space-x-2 w-full justify-center items-center'>
      <AWSPlatformIcon className='w-8 h-8' />
      <PlusIcon className='text-gray-400 w-5 h-5' />
      <TerraformIcon className='w-8 h-8' />
    </div>
  },
  {
    name: 'AWS with CDK',
    platform: 'awscdk',
    output: {
      example: `{
 "Resources": {
  "InputsECF79824": {
   "Type": "AWS::S3::Bucket",
   "Properties": {
    "BucketEncryption": {
     "ServerSideEncryptionConfiguration": [
      {
       "ServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
       }
      }
     ]
    },
    "PublicAccessBlockConfiguration": {
     "BlockPublicAcls": true,
     "BlockPublicPolicy": true,
     "IgnorePublicAcls": true,
     "RestrictPublicBuckets": true
    }
   },
   "UpdateReplacePolicy": "Delete",
   "DeletionPolicy": "Delete"
  },
  "OutputsA3C868EE": {
   "Type": "AWS::S3::Bucket",
   "Properties": {
    "BucketEncryption": {
     "ServerSideEncryptionConfiguration": [
      {
       "ServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
       }
      }
     ]
    },
    "PublicAccessBlockConfiguration": {
     "BlockPublicAcls": true,
     "BlockPublicPolicy": true,
     "IgnorePublicAcls": true,
     "RestrictPublicBuckets": true
    }
   },
   "UpdateReplacePolicy": "Delete",
   "DeletionPolicy": "Delete"
  },
  "Counter44A08DAC": {
   "Type": "AWS::DynamoDB::Table",
   "Properties": {
    "AttributeDefinitions": [
     {
      "AttributeName": "id",
      "AttributeType": "S"
     }
    ],
    "BillingMode": "PAY_PER_REQUEST",
    "KeySchema": [
     {
      "AttributeName": "id",
      "KeyType": "HASH"
     }
    ]
   },
   "UpdateReplacePolicy": "Delete",
   "DeletionPolicy": "Delete"
  },
  "FunctionLogGroup55B80E27": {
   "Type": "AWS::Logs::LogGroup",
   "Properties": {
    "RetentionInDays": 30
   },
   "UpdateReplacePolicy": "Retain",
   "DeletionPolicy": "Retain"
  },
  "FunctionServiceRole675BB04A": {
   "Type": "AWS::IAM::Role",
   "Properties": {
    "AssumeRolePolicyDocument": {
     "Statement": [
      {
       "Action": "sts:AssumeRole",
       "Effect": "Allow",
       "Principal": {
        "Service": "lambda.amazonaws.com"
       }
      }
     ],
     "Version": "2012-10-17"
    },
    "ManagedPolicyArns": [
     {
      "Fn::Join": [
       "",
       [
        "arn:",
        {
         "Ref": "AWS::Partition"
        },
        ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
       ]
      ]
     }
    ]
   }
  },
  "FunctionServiceRoleDefaultPolicy2F49994A": {
   "Type": "AWS::IAM::Policy",
   "Properties": {
    "PolicyDocument": {
     "Statement": [
      {
       "Action": "dynamodb:UpdateItem",
       "Effect": "Allow",
       "Resource": {
        "Fn::GetAtt": [
         "Counter44A08DAC",
         "Arn"
        ]
       }
      },
      {
       "Action": [
        "s3:List*",
        "s3:GetObject*",
        "s3:GetBucket*"
       ],
       "Effect": "Allow",
       "Resource": [
        {
         "Fn::GetAtt": [
          "InputsECF79824",
          "Arn"
         ]
        },
        {
         "Fn::Join": [
          "",
          [
           {
            "Fn::GetAtt": [
             "InputsECF79824",
             "Arn"
            ]
           },
           "/*"
          ]
         ]
        }
       ]
      },
      {
       "Action": [
        "s3:PutObject*",
        "s3:Abort*"
       ],
       "Effect": "Allow",
       "Resource": [
        {
         "Fn::GetAtt": [
          "OutputsA3C868EE",
          "Arn"
         ]
        },
        {
         "Fn::Join": [
          "",
          [
           {
            "Fn::GetAtt": [
             "OutputsA3C868EE",
             "Arn"
            ]
           },
           "/*"
          ]
         ]
        }
       ]
      }
     ],
     "Version": "2012-10-17"
    },
    "PolicyName": "FunctionServiceRoleDefaultPolicy2F49994A",
    "Roles": [
     {
      "Ref": "FunctionServiceRole675BB04A"
     }
    ]
   }
  },
  "Function76856677": {
   "Type": "AWS::Lambda::Function",
   "Properties": {
    "Architectures": [
     "arm64"
    ],
    "Code": {
     "S3Bucket": {
      "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}"
     },
     "S3Key": "5c4e72a2d64689e1d6d4f21d0c57dff7e5d8281d8a59e3dedbd0d1f226db9071.zip"
    },
    "Environment": {
     "Variables": {
      "NODE_OPTIONS": "--enable-source-maps",
      "WING_TARGET": "awscdk",
      "DYNAMODB_TABLE_NAME_e10db37d": {
       "Ref": "Counter44A08DAC"
      },
      "BUCKET_NAME_fdd30639": {
       "Ref": "InputsECF79824"
      },
      "BUCKET_NAME_61cd8f55": {
       "Ref": "OutputsA3C868EE"
      }
     }
    },
    "Handler": "index.handler",
    "LoggingConfig": {
     "LogFormat": "JSON",
     "LogGroup": {
      "Ref": "FunctionLogGroup55B80E27"
     }
    },
    "MemorySize": 1024,
    "Role": {
     "Fn::GetAtt": [
      "FunctionServiceRole675BB04A",
      "Arn"
     ]
    },
    "Runtime": "nodejs20.x",
    "Timeout": 60
   },
   "DependsOn": [
    "FunctionServiceRoleDefaultPolicy2F49994A",
    "FunctionServiceRole675BB04A"
   ]
  }
 },
 "Parameters": {
  "BootstrapVersion": {
   "Type": "AWS::SSM::Parameter::Value<String>",
   "Default": "/cdk-bootstrap/hnb659fds/version",
   "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"
  }
 },
 "Rules": {
  "CheckBootstrapVersion": {
   "Assertions": [
    {
     "Assert": {
      "Fn::Not": [
       {
        "Fn::Contains": [
         [
          "1",
          "2",
          "3",
          "4",
          "5"
         ],
         {
          "Ref": "BootstrapVersion"
         }
        ]
       }
      ]
     },
     "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."
    }
   ]
  }
 }
}`,
      metastring: 'title="AWS CDK"',
    },
    platformIcon: () => <div className='flex space-x-2 w-full justify-center items-center'>
      <AWSPlatformIcon className='w-8 h-8' />
      <PlusIcon className='text-gray-400 w-5 h-5' />
      <CDKIcon className='!w-10 !h-10 dark:text-white text-orange-500' />
    </div>
  },
  {
    name: 'Azure with Terraform',
    platform: 'azure-tf',
    output: {
      example: `{
  "provider": {
    "azurerm": [
      {
        "features": {
          "resource_group": {
            "prevent_deletion_if_contains_resources": false
          }
        }
      }
    ]
  },
  "resource": {
    "azurerm_application_insights": {
      "ApplicationInsights": {
        "//": {
          "metadata": {
            "path": "root/Default/ApplicationInsights",
            "uniqueId": "ApplicationInsights"
          }
        },
        "application_type": "web",
        "location": "\${azurerm_resource_group.ResourceGroup.location}",
        "name": "application-insights",
        "resource_group_name": "\${azurerm_resource_group.ResourceGroup.name}",
        "workspace_id": "\${azurerm_log_analytics_workspace.LogAnalyticsWorkspace.id}"
      }
    },
    "azurerm_linux_function_app": {
      "Function_042596DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/Function",
            "uniqueId": "Function_042596DC"
          }
        },
        "app_settings": {
          "BUCKET_NAME_23e2e49d": "\${azurerm_storage_container.Inputs_Bucket_4FACFAC2.name}",
          "BUCKET_NAME_b5c65333": "\${azurerm_storage_container.Outputs_Bucket_F94D9F99.name}",
          "FUNCTIONS_WORKER_RUNTIME": "node",
          "STORAGE_ACCOUNT_0a1532c6": "\${azurerm_storage_account.StorageAccount.name}",
          "STORAGE_ACCOUNT_23e2e49d": "\${azurerm_storage_account.StorageAccount.name}",
          "STORAGE_ACCOUNT_KEY_0a1532c6": "\${azurerm_storage_account.StorageAccount.primary_access_key}",
          "STORAGE_ACCOUNT_b5c65333": "\${azurerm_storage_account.StorageAccount.name}",
          "TABLE_NAME_0a1532c6": "\${azurerm_storage_table.Counter_CounterTable_D17407E5.name}",
          "WEBSITE_RUN_FROM_PACKAGE": "https://\${azurerm_storage_account.StorageAccount.name}.blob.core.windows.net/\${azurerm_storage_container.Function_FunctionBucket_0F705EF9.name}/\${azurerm_storage_blob.Function_CodeBlob_8A9705C9.name}",
          "WING_TARGET": "tf-azure"
        },
        "https_only": true,
        "identity": {
          "type": "SystemAssigned"
        },
        "location": "\${azurerm_resource_group.ResourceGroup.location}",
        "name": "function-c852aba6",
        "resource_group_name": "\${azurerm_resource_group.ResourceGroup.name}",
        "service_plan_id": "\${azurerm_service_plan.ServicePlan.id}",
        "site_config": {
          "application_insights_connection_string": "\${azurerm_application_insights.ApplicationInsights.connection_string}",
          "application_insights_key": "\${azurerm_application_insights.ApplicationInsights.instrumentation_key}",
          "application_stack": {
            "node_version": "20"
          }
        },
        "storage_account_access_key": "\${azurerm_storage_account.StorageAccount.primary_access_key}",
        "storage_account_name": "\${azurerm_storage_account.StorageAccount.name}"
      }
    },
    "azurerm_log_analytics_workspace": {
      "LogAnalyticsWorkspace": {
        "//": {
          "metadata": {
            "path": "root/Default/LogAnalyticsWorkspace",
            "uniqueId": "LogAnalyticsWorkspace"
          }
        },
        "location": "East US",
        "name": "Default-c82bf964",
        "resource_group_name": "\${azurerm_resource_group.ResourceGroup.name}"
      }
    },
    "azurerm_resource_group": {
      "ResourceGroup": {
        "//": {
          "metadata": {
            "path": "root/Default/ResourceGroup",
            "uniqueId": "ResourceGroup"
          }
        },
        "location": "East US",
        "name": "Default-c82bf964"
      }
    },
    "azurerm_role_assignment": {
      "Function_ReadLambdaCodeAssignment_75049D5E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/ReadLambdaCodeAssignment",
            "uniqueId": "Function_ReadLambdaCodeAssignment_75049D5E"
          }
        },
        "principal_id": "\${azurerm_linux_function_app.Function_042596DC.identity[0].principal_id}",
        "role_definition_name": "Storage Blob Data Reader",
        "scope": "\${azurerm_storage_account.StorageAccount.id}"
      },
      "Function_RoleAssignmentc8e1d35875c13ca650f2fed5dbae08291b89c185ec_StorageBlobDataContributor_56D5F61F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/RoleAssignmentc8e1d35875c13ca650f2fed5dbae08291b89c185ec_Storage Blob Data Contributor",
            "uniqueId": "Function_RoleAssignmentc8e1d35875c13ca650f2fed5dbae08291b89c185ec_StorageBlobDataContributor_56D5F61F"
          }
        },
        "principal_id": "\${azurerm_linux_function_app.Function_042596DC.identity[0].principal_id}",
        "role_definition_name": "Storage Blob Data Contributor",
        "scope": "\${azurerm_storage_account.StorageAccount.id}"
      },
      "Function_RoleAssignmentc8e1d35875c13ca650f2fed5dbae08291b89c185ec_StorageTableDataContributor_3E18F445": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/RoleAssignmentc8e1d35875c13ca650f2fed5dbae08291b89c185ec_Storage Table Data Contributor",
            "uniqueId": "Function_RoleAssignmentc8e1d35875c13ca650f2fed5dbae08291b89c185ec_StorageTableDataContributor_3E18F445"
          }
        },
        "principal_id": "\${azurerm_linux_function_app.Function_042596DC.identity[0].principal_id}",
        "role_definition_name": "Storage Table Data Contributor",
        "scope": "\${azurerm_storage_account.StorageAccount.id}"
      }
    },
    "azurerm_service_plan": {
      "ServicePlan": {
        "//": {
          "metadata": {
            "path": "root/Default/ServicePlan",
            "uniqueId": "ServicePlan"
          }
        },
        "location": "\${azurerm_resource_group.ResourceGroup.location}",
        "name": "Default-c82bf964",
        "os_type": "Linux",
        "resource_group_name": "\${azurerm_resource_group.ResourceGroup.name}",
        "sku_name": "Y1"
      }
    },
    "azurerm_storage_account": {
      "StorageAccount": {
        "//": {
          "metadata": {
            "path": "root/Default/StorageAccount",
            "uniqueId": "StorageAccount"
          }
        },
        "account_replication_type": "LRS",
        "account_tier": "Standard",
        "location": "\${azurerm_resource_group.ResourceGroup.location}",
        "name": "defaultc82bf964",
        "resource_group_name": "\${azurerm_resource_group.ResourceGroup.name}"
      }
    },
    "azurerm_storage_blob": {
      "Function_CodeBlob_8A9705C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/CodeBlob",
            "uniqueId": "Function_CodeBlob_8A9705C9"
          }
        },
        "name": "function-c852aba6.zip",
        "source": "assets/Function_Asset_212D1EED/602A3447EF11790A36EB7B58D92714D1/archive.zip",
        "storage_account_name": "\${azurerm_storage_account.StorageAccount.name}",
        "storage_container_name": "\${azurerm_storage_container.Function_FunctionBucket_0F705EF9.name}",
        "type": "Block"
      }
    },
    "azurerm_storage_container": {
      "Function_FunctionBucket_0F705EF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/FunctionBucket/Bucket",
            "uniqueId": "Function_FunctionBucket_0F705EF9"
          }
        },
        "container_access_type": "private",
        "name": "functionbucket-c8ccf7e8",
        "storage_account_name": "\${azurerm_storage_account.StorageAccount.name}"
      },
      "Inputs_Bucket_4FACFAC2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Inputs/Bucket",
            "uniqueId": "Inputs_Bucket_4FACFAC2"
          }
        },
        "container_access_type": "private",
        "name": "inputs-c8676bf7",
        "storage_account_name": "\${azurerm_storage_account.StorageAccount.name}"
      },
      "Outputs_Bucket_F94D9F99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Outputs/Bucket",
            "uniqueId": "Outputs_Bucket_F94D9F99"
          }
        },
        "container_access_type": "private",
        "name": "outputs-c80efaa7",
        "storage_account_name": "\${azurerm_storage_account.StorageAccount.name}"
      }
    },
    "azurerm_storage_table": {
      "Counter_CounterTable_D17407E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/CounterTable",
            "uniqueId": "Counter_CounterTable_D17407E5"
          }
        },
        "name": "counterxc824ef62",
        "storage_account_name": "\${azurerm_storage_account.StorageAccount.name}"
      }
    }
  },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "azurerm": {
        "source": "azurerm",
        "version": "3.96.0"
      }
    }
  }
}`,
      metastring: 'title="Azure Terraform (main.tf.json)"',
    },
    metastring: 'platform',
    platformIcon: () => <div className='flex space-x-2 w-full justify-center items-center'>
      <AzurePlatformIcon className='w-8 h-8' />
      <PlusIcon className='text-gray-400 w-5 h-5' />
      <TerraformIcon className='w-8 h-8' />
    </div>
  },
  {
    name: 'GCP with Terraform',
    platform: 'gcp-tf',
    output: {
      example: `{
  "provider": {
    "google": [
      {
        "project": "my-project-id",
        "region": "us-west1"
      }
    ],
    "random": [
      {
      }
    ]
  },
  "resource": {
    "google_cloudfunctions_function": {
      "Function_DefaultFunction_81B206D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/DefaultFunction",
            "uniqueId": "Function_DefaultFunction_81B206D7"
          }
        },
        "available_memory_mb": 1024,
        "description": "This function was created by Wing",
        "entry_point": "handler",
        "environment_variables": {
          "BUCKET_NAME_03e8cb1d": "\${google_storage_bucket.Outputs.name}",
          "BUCKET_NAME_6d1466a7": "\${google_storage_bucket.Inputs.name}",
          "FIRESTORE_DATABASE_NAME_6cb5a3a4": "\${google_firestore_database.Counter.name}",
          "WING_TARGET": "tf-gcp"
        },
        "https_trigger_security_level": "SECURE_ALWAYS",
        "name": "function-c852aba6",
        "project": "my-project-id",
        "region": "us-west1",
        "runtime": "nodejs20",
        "service_account_email": "\${google_service_account.Function_ServiceAccountc852aba6d7cbe50c86bbedd1463b05db52425574b5_504E4375.email}",
        "source_archive_bucket": "\${google_storage_bucket.Function_FunctionBucket_CD7D2793.name}",
        "source_archive_object": "\${google_storage_bucket_object.Function_FunctionObjectBucket_A7CD2097.name}",
        "timeout": 120,
        "trigger_http": true
      }
    },
    "google_firestore_database": {
      "Counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/Default",
            "uniqueId": "Counter"
          }
        },
        "app_engine_integration_mode": "DISABLED",
        "concurrency_mode": "OPTIMISTIC",
        "delete_protection_state": "DELETE_PROTECTION_DISABLED",
        "deletion_policy": "DELETE",
        "depends_on": [
          "google_project_service.Counter_CloudFirestoreAPI_2119CDFC"
        ],
        "location_id": "us-west1",
        "name": "wing-counter-counter-c824ef62",
        "point_in_time_recovery_enablement": "POINT_IN_TIME_RECOVERY_DISABLED",
        "type": "DATASTORE_MODE"
      }
    },
    "google_project_iam_member": {
      "Function_project-iam-member-KEN13_4B223C74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/project-iam-member-KEN.13]}",
            "uniqueId": "Function_project-iam-member-KEN13_4B223C74"
          }
        },
        "member": "serviceAccount:\${google_service_account.Function_ServiceAccountc852aba6d7cbe50c86bbedd1463b05db52425574b5_504E4375.email}",
        "project": "my-project-id",
        "role": "roles/datastore.user"
      }
    },
    "google_project_service": {
      "Counter_CloudFirestoreAPI_2119CDFC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/CloudFirestoreAPI",
            "uniqueId": "Counter_CloudFirestoreAPI_2119CDFC"
          }
        },
        "disable_on_destroy": false,
        "service": "firestore.googleapis.com"
      },
      "Function_FunctionBucket_IamServiceAccountCredentialsApi_EC496DEC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/FunctionBucket/IamServiceAccountCredentialsApi",
            "uniqueId": "Function_FunctionBucket_IamServiceAccountCredentialsApi_EC496DEC"
          }
        },
        "disable_dependent_services": false,
        "disable_on_destroy": false,
        "service": "iamcredentials.googleapis.com"
      },
      "Inputs_IamServiceAccountCredentialsApi_8D18659F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Inputs/IamServiceAccountCredentialsApi",
            "uniqueId": "Inputs_IamServiceAccountCredentialsApi_8D18659F"
          }
        },
        "disable_dependent_services": false,
        "disable_on_destroy": false,
        "service": "iamcredentials.googleapis.com"
      },
      "Outputs_IamServiceAccountCredentialsApi_FA13A158": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Outputs/IamServiceAccountCredentialsApi",
            "uniqueId": "Outputs_IamServiceAccountCredentialsApi_FA13A158"
          }
        },
        "disable_dependent_services": false,
        "disable_on_destroy": false,
        "service": "iamcredentials.googleapis.com"
      }
    },
    "google_service_account": {
      "Function_ServiceAccountc852aba6d7cbe50c86bbedd1463b05db52425574b5_504E4375": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/ServiceAccountc852aba6d7cbe50c86bbedd1463b05db52425574b5",
            "uniqueId": "Function_ServiceAccountc852aba6d7cbe50c86bbedd1463b05db52425574b5_504E4375"
          }
        },
        "account_id": "function-c852aba6",
        "display_name": "Custom Service Account for Cloud Function c852aba6d7cbe50c86bbedd1463b05db52425574b5"
      }
    },
    "google_storage_bucket": {
      "Function_FunctionBucket_CD7D2793": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/FunctionBucket/Default",
            "uniqueId": "Function_FunctionBucket_CD7D2793"
          }
        },
        "depends_on": [
          "google_project_service.Function_FunctionBucket_IamServiceAccountCredentialsApi_EC496DEC"
        ],
        "force_destroy": false,
        "location": "us-west1",
        "name": "functionbucket-\${random_id.Function_FunctionBucket_Id_216676D0.hex}",
        "public_access_prevention": "enforced",
        "uniform_bucket_level_access": true
      },
      "Inputs": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Inputs/Default",
            "uniqueId": "Inputs"
          }
        },
        "depends_on": [
          "google_project_service.Inputs_IamServiceAccountCredentialsApi_8D18659F"
        ],
        "force_destroy": false,
        "location": "us-west1",
        "name": "inputs-\${random_id.Inputs_Id_DC2A568A.hex}",
        "public_access_prevention": "enforced",
        "uniform_bucket_level_access": true
      },
      "Outputs": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Outputs/Default",
            "uniqueId": "Outputs"
          }
        },
        "depends_on": [
          "google_project_service.Outputs_IamServiceAccountCredentialsApi_FA13A158"
        ],
        "force_destroy": false,
        "location": "us-west1",
        "name": "outputs-\${random_id.Outputs_Id_88D4ADA1.hex}",
        "public_access_prevention": "enforced",
        "uniform_bucket_level_access": true
      }
    },
    "google_storage_bucket_iam_member": {
      "Inputs_bucket-iam-member-KEN17-KEN18_B669AF4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Inputs/bucket-iam-member-KEN.17]}-KEN.18]}",
            "uniqueId": "Inputs_bucket-iam-member-KEN17-KEN18_B669AF4A"
          }
        },
        "bucket": "\${google_storage_bucket.Inputs.name}",
        "member": "serviceAccount:\${google_cloudfunctions_function.Function_DefaultFunction_81B206D7.service_account_email}",
        "role": "roles/storage.objectViewer"
      },
      "Outputs_bucket-iam-member-KEN23-KEN24_3D9AAE91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Outputs/bucket-iam-member-KEN.23]}-KEN.24]}",
            "uniqueId": "Outputs_bucket-iam-member-KEN23-KEN24_3D9AAE91"
          }
        },
        "bucket": "\${google_storage_bucket.Outputs.name}",
        "member": "serviceAccount:\${google_cloudfunctions_function.Function_DefaultFunction_81B206D7.service_account_email}",
        "role": "roles/storage.objectCreator"
      }
    },
    "google_storage_bucket_object": {
      "Function_FunctionObjectBucket_A7CD2097": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/FunctionObjectBucket",
            "uniqueId": "Function_FunctionObjectBucket_A7CD2097"
          }
        },
        "bucket": "\${google_storage_bucket.Function_FunctionBucket_CD7D2793.name}",
        "name": "objects",
        "source": "assets/Function_Asset_212D1EED/3696740317AA62CB0AE25CD2D8EC4FB2/archive.zip"
      }
    },
    "random_id": {
      "Function_FunctionBucket_Id_216676D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/FunctionBucket/Id",
            "uniqueId": "Function_FunctionBucket_Id_216676D0"
          }
        },
        "byte_length": 4
      },
      "Inputs_Id_DC2A568A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Inputs/Id",
            "uniqueId": "Inputs_Id_DC2A568A"
          }
        },
        "byte_length": 4
      },
      "Outputs_Id_88D4ADA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Outputs/Id",
            "uniqueId": "Outputs_Id_88D4ADA1"
          }
        },
        "byte_length": 4
      }
    }
  },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "google": {
        "source": "google",
        "version": "5.10.0"
      },
      "random": {
        "source": "random",
        "version": "3.5.1"
      }
    }
  }
}`,
      metastring: 'title="GCP Terraform (main.tf.json)"',
    },
    metastring: 'platform',
    platformIcon: () => <div className='flex space-x-2 w-full justify-center items-center'>
      <GCPPlatformIcon className='w-8 h-8' />
      <PlusIcon className='text-gray-400 w-5 h-5' />
      <TerraformIcon className='w-8 h-8' />
    </div>
  }
]

export default function CrossCloud() {

  const [selectedPlatform, setSelectedPlatform] = React.useState(platforms[0])

  return (
    <div className="dark:bg-gray-900 bg-gray-100/50 py-16 pb-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" max-w-3xl lg:text-left">
          <h2 className="text-xl font-semibold leading-7 text-wing">Wing platforms</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight dark:text-gray-100 sm:text-5xl">
            Deploy to any cloud
          </p>
          <p className="mt-6 text-lg leading-8 dark:text-gray-300">
            Wing platforms specify how and where your application is deployed. They determine both the cloud environment and the provisioning engine that the code will be deployed with.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-none">
          <div className='grid grid-cols-12 gap-8 '>
            
            <span className='col-span-12 -mb-4 block md:hidden font-bold'>1. Write your code</span>
            <div className="col-span-12 md:col-span-5 bg-gray-300 dark:bg-gradient-to-tl from-wing via-wing/45 to-wing/80 transition-all shadow-[0_10px_20px_0_#3737373d] dark:shadow-[0_10px_100px_0_#2ad5c15c] p-[2px] rounded-md max-h-[550px]" >
              
              <CodeBlock
                language="js"
                className='h-full w-full p-0 m-0 !rounded-none'
                metastring={'title="wing.w" playground'}
              >
                {codeExample}
              </CodeBlock>
            </div>
            <span className='col-span-12 -mb-4 block md:hidden font-bold'>2. Compile to a Wing platform</span>
            <div className="col-span-12 md:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                {platforms.map((platform, index) => {
                  const isSelected = selectedPlatform.platform === platform.platform
                  return <div key={index} className={classNames(!isSelected ? '!border-wing/10 bg-gray-100/50' : '', isSelected ? '!border-wing/50 bg-white dark:bg-black  text-gray-900 border-2' : '!border-gray-800 dark:bg-black/10 ', 'flex flex-col gap-2 p-2 dark:bg-gray-800 rounded-md cursor-pointer relative  !border-2 min-h-[6em] items-center justify-center ')} style={{ border: "solid" }} onClick={() => setSelectedPlatform(platform)}>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <platform.platformIcon />
                      <span className="text-sm font-semibold dark:text-gray-200">{platform.name}</span>
                    </div>
                  </div>
                })}
              </div>
            </div>
            <span className='col-span-12 -mb-4 block md:hidden font-bold '>3. Generated output</span>
            <div className="col-span-12 md:col-span-5 bg-gray-300 dark:bg-gradient-to-tl from-wing via-wing/45 to-wing/80 transition-all shadow-[0_10px_20px_0_#3737373d] dark:shadow-[0_10px_100px_0_#2ad5c15c] p-[2px] rounded-md max-h-[550px]" >
              <CodeBlock
                language="json"
                className='h-full w-full p-0 m-0 !rounded-none overflow-auto '
                metastring={selectedPlatform.output.metastring}
              >
                {selectedPlatform.output.example}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
