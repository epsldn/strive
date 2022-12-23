import boto3
import uuid
import os

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)


ALLOWED_EXTENSION = {"png", "jpg", "jpeg", "heic"}


def file_checker(file):
    return "." in file and file.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSION


def get_unique_filename(file):
    extension = file.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{extension}"


BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"


def upload_file(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )

    except Exception as error:
        return {"errors": str(error)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

