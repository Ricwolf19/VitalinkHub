import React, { Key } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  NavbarMenu, 
  NavbarMenuItem, 
  NavbarMenuToggle,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,  
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";

import { Link as LinkDom } from 'react-router-dom'
import { Logo } from "./Logo.jsx";
import { Link as ScrollLink } from "react-scroll"; //Se puede adaptar nombre a lo que se agarre de el paquete
import { useForm, ValidationError } from '@formspree/react';

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [value, setValue] = React.useState<Set<Key>>(new Set());

  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY as string);

    const selectOptions = [
      { label: "Personal Use", value: "personal", description: "Select this option for personal use." },
      { label: "Company", value: "company", description: "Select this option for company-related accounts." },
      { label: "Hospital", value: "hospital", description: "Select this option for hospital-related accounts." },
    ] as const;
    
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <ScrollLink to="Objective" spy offset={-80} duration={500} className="text-red-600">
            Objective
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="Services" spy offset={-80} duration={500} className="text-red-600">
            Services
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="OurTeam" spy offset={-80} duration={500} className="text-red-600">
            Our Team
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          <ScrollLink to="ContactUs" spy offset={-80} duration={500} className="text-red-600">
            Contact Us
          </ScrollLink>
        </NavbarItem>
        <NavbarItem isActive>
          
        <Button onPress={onOpen} color="danger" variant="solid">
        Sign Up
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-red-900 to-blue-900/10 backdrop-opacity-900",
        }}
      >
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1 text-red-600">Create an Account</ModalHeader>
        <ModalBody>
        <Logo />
          <p className="text-center">
            If you want to create an account to access VitaLink's technology, please
            contact us and provide the following information for better interaction
            with the VitaLinkTeam. Thank you.
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex w-full h-full items-center justify-center">
          <Select
            label="Target audience"
            variant="underlined"
            color="danger"
            placeholder="Select an audience"
            selectedKeys={value}
            className="max-w-xs"
            onSelectionChange={(keys: Selection) => {
              const newSet = new Set(keys); // Transform `Selection` type to `Set` type if 'keys' is iterable
              setValue(newSet);
            }}
            id="message"
            name="message"
          >
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
    </div>
            <br />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Company, Hospital or Full Name" id="message" name="message" color="danger" variant="faded" />
            </div>
            <br />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="email" label="Email" id="email" name="email" color="danger" variant="faded" />
              <Input label="Contact Number" id="message" name="message" color="danger" variant="faded" />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <br />
            <Textarea
              label="Reason for Account"
              color="danger" 
              variant="faded"
              placeholder="Tell us why you need the account..."
              className="col-span-12 md:col-span-6 mb-6 md:mb-0"
              id="message"
              name="message"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <div className="mt-4 text-right">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} type="submit" disabled={state.submitting}>
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </>
    )}
  </ModalContent>
</Modal>

        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Button as={LinkDom} to={"/Login"} color="danger" variant="ghost">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <ScrollLink to="Objective" spy offset={-80} duration={500} className="text-red-600">
            Objective
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="Services" spy offset={-80} duration={500} className="text-red-600">
            Services
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="OurTeam" spy offset={-80} duration={500} className="text-red-600">
            Our Team
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ScrollLink to="ContactUs" spy offset={-80} duration={500} className="text-red-600">
            Contact Us
          </ScrollLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarItem>
           
          <Button onPress={onOpen} color="danger" variant="solid">
        Sign Up
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-red-900 to-blue-900/10 backdrop-opacity-900",
        }}
      >
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1 text-red-600">Create an Account</ModalHeader>
        <ModalBody>
        <Logo />
          <p className="text-center">
            If you want to create an account to access VitaLink's technology, please
            contact us and provide the following information for better interaction
            with the VitaLinkTeam. Thank you.
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex w-full h-full items-center justify-center">
          <Select
            label="Target audience"
            variant="underlined"
            color="danger"
            placeholder="Select an audience"
            selectedKeys={value}
            className="max-w-xs"
            onSelectionChange={(keys: Selection) => {
              const newSet = new Set(keys); // Transform `Selection` type to `Set` type if 'keys' is iterable
              setValue(newSet);
            }}
            id="message"
            name="message"
          >
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
    </div>
            <br />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Company, Hospital or Full Name" id="message" name="message" color="danger" variant="faded" />
            </div>
            <br />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="email" label="Email" id="email" name="email" color="danger" variant="faded" />
              <Input label="Contact Number" id="message" name="message" color="danger" variant="faded" />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <br />
            <Textarea
              label="Reason for Account"
              color="danger" 
              variant="faded"
              placeholder="Tell us why you need the account..."
              className="col-span-12 md:col-span-6 mb-6 md:mb-0"
              id="message"
              name="message"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <div className="mt-4 text-right">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} type="submit" disabled={state.submitting}>
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </>
    )}
  </ModalContent>
</Modal>

          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
