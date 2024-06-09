/* eslint-disable react/prop-types */
/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const {mutate, isPending: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });


  function onSubmit(data) {
    mutate({...data, image: data.image[0]});
  }

  function onError(err) {
    // console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })} disabled={isCreating} />
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
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
      <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price needs to be at least 1"
          },
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
      <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than or equal to the regular price",
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
      <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" accept="image/*" {...register("image", {
          required: "This field is required"
        })} disabled={isCreating} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
