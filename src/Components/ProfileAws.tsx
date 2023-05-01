import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { popUpMessage, popUpModal } from "../atom";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ProfileInputButton,
  ProfileInputImg,
  ProfileMinDiv,
} from "../styles/MypageStyled";
import { CreateStyledInputButtonWhite } from "./loginStyled";
import PopupMessage from "./PopupMessage";

const S3Uploader = () => {
  const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
  const [imgmessage, setimgMessage] = useRecoilState(popUpMessage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgsrc, setImgsrc] = useState("");
  const imageRef = useRef(null);

  const ImageUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    (imageRef.current! as HTMLElement).click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    if (file.length === 0) {
      setImgsrc("");
      setSelectedFile(null);
    } else {
      setSelectedFile(e.target.files![0]);
      const {
        currentTarget: { files },
      } = e;
      const theFile = files![0];
      const reader = new FileReader();
      reader?.readAsDataURL(theFile);
      reader.onloadend = (finishedE) => {
        const {
          currentTarget: { result },
        }: any = finishedE;
        setImgsrc(result);
      };
    }
  };

  const UploadImageS3 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedFile === null) {
      setModalOpen(!modalOpen);
      setimgMessage("이미지를 넣어주셔야 되요!");
    } else {
      const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
        },
      });
      const data = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
        Key: (selectedFile! as File).name,
        Body: selectedFile!,
      };
      const command = new PutObjectCommand(data);
      try {
        const res = await s3.send(command);
        console.log(res);
        return `${process.env.REACT_APP_S3_BUCKET_NAME}`;
      } catch (error) {
        setModalOpen(!modalOpen);
        setimgMessage("에러가 발생했어요!");
        throw error;
      }
    }
  };

  //   const UploadImageS4 = async (file: File): Promise<string> => {
  //     const s3Client = new S3Client({ region: process.env.AWS_REGION });
  //     const uploadParams = {
  //       Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
  //       Key: file.name,
  //       ContentType: file.type,
  //       Body: file,
  //     };
  //     const command = new PutObjectCommand(uploadParams);

  //     try {
  //       const res = await s3Client.send(command);
  //       return `${process.env.REACT_APP_S3_BUCKET_NAME}`;
  //     } catch (error) {
  //       console.log("Error", error);
  //       throw error;
  //     }
  //   };

  const UserSvgWhite = () => {
    return (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="100"
          cy="100"
          r="99"
          fill="white"
          stroke="#BABABA"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M88.9344 110.246C72.1782 110.246 58.3579 122.816 56.3882 139.04C56.1219 141.233 57.9384 143.033 60.1475 143.033H139.852C142.062 143.033 143.878 141.233 143.612 139.04C141.642 122.816 127.822 110.246 111.066 110.246H88.9344Z"
          fill="#FAD4D4"
        />
        <circle
          cx="100"
          cy="77.4591"
          r="22.9508"
          fill="black"
          fillOpacity="0.4"
        />
        <circle cx="100" cy="77.4591" r="22.9508" fill="#FAD4D4" />
      </svg>
    );
  };

  return (
    <>
      {imgsrc === "" ? (
        <ProfileMinDiv>
          <div style={{ width: "168px", backgroundColor: "#EF9F9F" }}>
            <UserSvgWhite />
          </div>
        </ProfileMinDiv>
      ) : (
        <ProfileMinDiv>
          <div style={{ width: "168px", backgroundColor: "#EF9F9F" }}>
            <img
              src={imgsrc}
              alt="profile-img"
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
              }}
            />
          </div>
        </ProfileMinDiv>
      )}
      <ProfileMinDiv>
        <ProfileInputButton onClick={ImageUpload}>
          <ProfileInputImg src="../camera.png" alt="profile_img" />
          프로필 사진 바꾸기
        </ProfileInputButton>
        <CreateStyledInputButtonWhite onClick={UploadImageS3}>
          저장하기
        </CreateStyledInputButtonWhite>
        <PopupMessage message={imgmessage} />;
        <input
          type="file"
          id="imginput"
          accept="img/*"
          onChange={handleFileInput}
          ref={imageRef}
          hidden
        />
      </ProfileMinDiv>
    </>
  );
};

export default S3Uploader;
