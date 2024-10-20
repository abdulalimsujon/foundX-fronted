"use client";

import { Button, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { useRouter } from "next/navigation";

import FXInput from "@/src/components/form/FXInput";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import { TrashIcon } from "@/src/assets/Icons";
import dateToISO from "@/src/utils/dateToISO";
import FXSelect from "@/src/components/form/FXselect";
import { useGetCategories } from "@/src/hooks/category.hooks";
import FXtextArea from "@/src/components/form/FXtextArea";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hooks";
import Loading from "@/src/components/UI/Loading";

const Page = () => {
  const {
    data: categories,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  const user = useUser();
  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess: createPostSuccess,
  } = useCreatePost();

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [ImagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const router = useRouter();

  const methods = useForm();

  let categoryOptions: { key: string; label: string }[] = [];

  if (categories && !categoryLoading) {
    categoryOptions = categories?.data?.map(
      (category: { _id: string; name: string }) => ({
        key: category?._id,
        label: category.name,
      }),
    );
  }

  const { control, handleSubmit } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "questions",
  });
  const cityOptions = allDistict()
    .sort()
    .map((city: string) => ({
      key: city,
      label: city,
    }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formdata = new FormData();
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data.dateFound),
      user: user.user?._id,
    };

    formdata.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formdata.append("itemImages", image);
    }

    handleCreatePost(formdata);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  if (!createPostPending && createPostSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Title" name="title" />
              </div>
              <div className="min-w-fit flex-1">
                <FXDatePicker label="Found date" name="dateFound" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Location" name="location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect label="city" name="city" options={cityOptions} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  disabled={!categorySuccess}
                  label="category"
                  name="category"
                  options={categoryOptions}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="block bg-gray-500 w-full h-full rounded-md"
                  htmlFor="image"
                >
                  uploads
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            <div className="flex gap-2 my-5 flex-wrap">
              {ImagePreviews.length > 0 &&
                ImagePreviews.map((imagePreviewUrl) => (
                  <div
                    key={imagePreviewUrl}
                    className="relative h-48 w-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt=""
                      className="w-full h-full object-cover object-cover"
                      src={imagePreviewUrl}
                    />
                  </div>
                ))}
            </div>
            <div className="flex gap-2 my-5 flex-wrap-reverse py-2">
              <div className="min-w-fit flex-1">
                <FXtextArea label="description" name="description" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button onClick={() => handleFieldAppend()}>Append</Button>
            </div>
            <div className="space-y-5">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FXInput label="Question" name={`questions.${index}.value`} />
                  <Button
                    isIconOnly
                    className="h-14 w-16"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            <Divider className="my-5" />
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Page;
