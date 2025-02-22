import {
  Card,
  CardBody,
  Avatar as AvatarMT,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import { MessageCard } from "../Cards";
import { useAccountData, useDoctorData, useFileStorage } from "../../../Context/authContext";
import { useState } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export function Settings() {
  const [t] = useTranslation("global")
  
  const { accountData, handleUpdateEmail, handleUpdateUserName, handleUpdatePhotoProfile } = useAccountData();
  const { doctorData } = useDoctorData();
  const { uploadImageToProfile, imgProfileList, deleteProfileImg } = useFileStorage();

  const [profileImg, newProfileImg] = useState<string>("");

  const handlePhotoProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    newProfileImg(e.target.value);
  };

  const handleDelPhotoProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImgToDelete(e.target.value);
  };

  interface selectPhotoProps {
    url: string
    name: string
  }

  const [imgToDelete, setImgToDelete] = useState<any>(null);
  const [imgToUpload, setImgToUpload] = useState<any>(null);
  // const [imgBg, setImgBg] = useState<any>(null);
  const [newEmail, setNewEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const onChangeEmail = ({ target }: any) => setNewEmail(target.value);
  const onChangeUser = ({ target }: any) => setNewUserName(target.value);

  return (
    <>
      <div className="relative mt-8 h-40 w-full overflow-hidden rounded-xl bg-[url('https://t3.ftcdn.net/jpg/01/12/72/68/360_F_112726816_u0a1lhRwLuZgZYCawX0SBksh2hPMBPbw.jpg')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-red-900/35" />
      </div>
      <Card placeholder="" className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody placeholder="" className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <AvatarMT
                placeholder=""
                src={accountData.profilePhoto}
                alt="Profile Photo"
                size="xxl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography placeholder="" variant="h5" color="blue-gray" className="mb-1">
                  {accountData.userName}
                </Typography>
                <Typography
                  placeholder=""
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {accountData.email}
                </Typography>
              </div>
            </div>
            <div className="w-70">
              <Tabs value="app">
                <TabsHeader placeholder="">
                  <Tab placeholder="" value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    {accountData.rol}
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>

          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography placeholder="" variant="h6" color="blue-gray" className="mb-3">
                {t("d-settings.title1")}
              </Typography>
              {/* <Card placeholder="" color="transparent" shadow={false}>
                <CardHeader
                  placeholder=""
                  floated={false}
                  color="gray"
                  className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                >
                  <img
                    src={accountData.profilePhoto}
                    alt={accountData.userName}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
              </Card> */}



              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  onChange={(e) => setImgToUpload(e.target.files)}
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000g"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3C50E0"
                      />
                    </svg>
                  </span>
                  <p>
                    <span className="text-primary">{t("d-settings.actions.upload.item1")}</span> {t("d-settings.actions.upload.item2")}
                  </p>
                  {/* <p className="mt-1.5">SVG, PNG, JPG</p> */}
                  <p>{t("d-settings.actions.upload.item3")}</p>
                </div>
              </div>
              <br />
              <div className="flex justify-center gap-5">
                <Button placeholder="" onClick={() => uploadImageToProfile(imgToUpload)} variant="outlined" size="sm" className=" bg-white text-black border-black">
                {t("d-settings.actions.upload.button")}
                </Button>
                {/* <Button placeholder="" variant="outlined" size="sm" className=" bg-blue-800 text-white border-white">
                    Save
                  </Button> */}
              </div>

              <div className="pb-0 pt-10 text-center">
                <Select
                  label={t("d-settings.actions.update.label")}
                  variant="faded"
                  color="primary"
                  placeholder={t("d-settings.holders")}
                  className="max-w-xs"
                  onChange={handlePhotoProfile}
                >
                  {imgProfileList.map((e: selectPhotoProps) => (
                    <SelectItem key={e.url} value={e.url} textValue={e.name}>
                      <div className="flex gap-2 items-center">
                        <Avatar alt={e.name} className="flex-shrink-0" size="sm" src={e.url} />
                        <div className="flex flex-col">
                          <span className="text-small">{e.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                <div className="flex justify-center gap-5 pt-5">
                  <Button placeholder="" onClick={() => handleUpdatePhotoProfile(profileImg)} variant="outlined" size="sm" className=" bg-blue-800 text-white border-white">
                  {t("d-settings.actions.update.button")}
                  </Button>
                </div>

              </div>
            </div>


            <div>
              <Typography placeholder="" variant="h6" color="blue-gray" className="mb-3">
              {t("d-settings.title2")}
              </Typography>
              <ul className="flex flex-col gap-6">
                {doctorData.map((props: any) => (
                  <MessageCard
                    key={props.name}
                    img="/img/doctor-icon.png"
                    {...props}
                    action={
                      <Button placeholder="" variant="text" size="sm">
                        N.CEDULA: {props.numCedula}
                      </Button>
                    }
                  />
                ))}
              </ul>

              <div className="pb-0 pt-12 text-center">
                <Select
                  label={t("d-settings.actions.delete.label")}
                  variant="faded"
                  color="danger"
                  placeholder={t("d-settings.holders")}
                  className="max-w-xs"
                  onChange={handleDelPhotoProfile}
                >
                  {imgProfileList.map((e: selectPhotoProps) => (
                    <SelectItem key={e.name} value={e.name} textValue={e.name}>
                      <div className="flex gap-2 items-center">
                        <Avatar alt={e.name} className="flex-shrink-0" size="sm" src={e.url} />
                        <div className="flex flex-col">
                          <span className="text-small">{e.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                <div className="flex justify-center gap-5 pt-5">
                  <Button placeholder="" onClick={() => deleteProfileImg(imgToDelete)} variant="outlined" size="sm" className=" bg-red-800 text-white border-white">
                  {t("d-settings.actions.delete.button")}
                  </Button>
                </div>

              </div>
            </div>


            <div className="relative w-full max-w-[24rem]">
              <Input
                crossOrigin=''
                type="email"
                label={t("d-settings.actions.account.email")}
                value={newEmail}
                onChange={onChangeEmail}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                placeholder=''
                size="sm"
                color={newEmail ? "gray" : "blue-gray"}
                onClick={() => handleUpdateEmail(newEmail)}
                disabled={!newEmail}
                className="!absolute right-1 top-1 rounded"
              >
                {t("d-settings.actions.account.button")}
              </Button>

              <br />
              <div className="relative w-full max-w-[24rem]">
                <Input
                  crossOrigin=''
                  type="text"
                  label={t("d-settings.actions.account.user")}
                  value={newUserName}
                  onChange={onChangeUser}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  placeholder=''
                  size="sm"
                  color={newUserName ? "gray" : "blue-gray"}
                  disabled={!newUserName}
                  onClick={() => handleUpdateUserName(newUserName)}
                  className="!absolute right-1 top-1 rounded"
                >
                 {t("d-settings.actions.account.button")}
                </Button>

              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}


