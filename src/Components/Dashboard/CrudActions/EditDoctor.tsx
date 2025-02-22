import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import { selectOptionStatusDoctors, selectOptionsArea } from "../../../Data";
import { Logo } from "../../../Components/HomePage/Icons";
import { UserCog } from "lucide-react";
import { useDoctorData, usePatientData } from "../../../Context/authContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export function EditDoctor({ name, lastName, area, numCedula, status, id, patients  }: any) {
    const { patientData } = usePatientData();
    const { handleUpdateDoctor } = useDoctorData()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const [t] = useTranslation("global")

    const [newDcName, setNewDcName] = useState(name);
    const [newDclastName, setNewDclastName] = useState(lastName);
    const [newDcStatus, setNewDcStatus] = useState(status);
    const [newDcArea, setNewDcArea] = useState(area);
    const [newDcNumCedula, setNewDcNumCedula] = useState(numCedula);
    const [newDcPatients, setNewDcPatients] = useState(patients);

    const handleSelectionPatients = (e: any) => {
        setNewDcPatients(e.target.value.split(","));
    };

    return (
        <div>
            <Button onPress={onOpen} color="primary" variant="shadow" startContent={<UserCog />} className="font-semibold">{t("d-personal.edit")}</Button>
            <Modal
                isOpen={isOpen}
                placement="auto"
                onOpenChange={onOpenChange}
                scrollBehavior={'inside'}
                classNames={{
                    body: "py-6",
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-red-600 text-center"><div className="pb-2 text-center flex-col flex gap-1"><Logo /></div>{t("d-personal.doctors.crudActions.title2")}</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label={t("d-personal.doctors.crudActions.item1")} color="primary" placeholder={name} defaultValue={name} onChange={(e) => setNewDcName(e.target.value)} variant="faded" />
                                    <Input label={t("d-personal.doctors.crudActions.item2")} color="primary" placeholder={lastName} defaultValue={lastName} onChange={(e) => setNewDclastName(e.target.value)} variant="faded" />
                                </div>    

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label={t("d-personal.doctors.crudActions.item3")} 
                                        placeholder={status}
                                        onChange={(e) => setNewDcStatus(e.target.value)}
                                        className="max-w-xs"
                                        variant="underlined"
                                        color="primary"
                                    >
                                        {selectOptionStatusDoctors.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.value}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label={t("d-personal.doctors.crudActions.item4")} 
                                        placeholder={area}
                                        onChange={(e) => setNewDcArea(e.target.value)}
                                        className="max-w-xs"
                                        variant="underlined"
                                        color="primary"
                                    >
                                        {selectOptionsArea.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.value}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label={t("d-personal.doctors.crudActions.item5")}  color="primary" type="number" placeholder={numCedula} defaultValue={numCedula} onChange={(e) => setNewDcNumCedula(e.target.valueAsNumber)} variant="faded" />
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label={t("d-personal.doctors.crudActions.item6")} 
                                        selectionMode="multiple"
                                        onChange={handleSelectionPatients}
                                    >
                                        {patientData.map((patient: any) => (
                                            <SelectItem key={patient.name} value={patient.name}>
                                                {`${patient.name}`}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    {/* <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p> */}
                                </div>

                                <div className="mt-4 text-right">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                    {t("d-personal.close")} 
                                    </Button>
                                    <Button color="primary" onPress={onClose} onClick={() => handleUpdateDoctor(id, newDcName, newDclastName, newDcArea, newDcNumCedula, newDcPatients, newDcStatus)}>
                                    {t("d-personal.edit")} 
                                    </Button>
                                </div>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}