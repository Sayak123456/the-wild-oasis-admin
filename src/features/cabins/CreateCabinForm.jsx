/* eslint-disable react/prop-types */
/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import {useCreateCabin} from "./useCreateCabin";
import {useUpdateCabin} from "./useUpdateCabin";

function CreateCabinForm({cabinToUpdate = {}, onCloseModal}) {
  const {isCreating, createCabin} = useCreateCabin();
  const {isUpdating, updateCabin} = useUpdateCabin();
  const isWorking = isCreating || isUpdating;
  
  const {id: updateId, ...updateValues} = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if(isUpdateSession) updateCabin({newCabinData: {...data, image}, id: updateId }, {
      onSuccess: (data) => {
        onCloseModal?.()
        reset()
      },
    });
    else createCabin({...data, image: image}, {
      onSuccess: (data) => {
        onCloseModal?.()
        reset()
      },
    });
  }

  function onError(err) {
    // console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input type="text" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity needs to be at least 1"
          },
          max: {
            value: 8,
            message: "Capacity can't be more than 8"
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
      <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price needs to be at least 1"
          },
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
      <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than or equal to the regular price",
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
      <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" accept="image/*" {...register("image", {
          required: isUpdateSession ? false : "This field is required"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isUpdateSession ? "Update cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
