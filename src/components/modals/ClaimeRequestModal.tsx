import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXtextArea from "../form/FXtextArea";

import FXmodal from "./FXmodal";

import { useAddClaimRequest } from "@/src/hooks/claimeRequest.hooks";

interface Iprops {
  id: string;
  questions: string[];
}

const ClaimeRequestModal = ({ id, questions }: Iprops) => {
  const { mutate: createClaime, isPending } = useAddClaimRequest();
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    const claimeRequestData = {
      item: id,
      description: data.description,
      answers: Object.keys(data)
        .filter((formElement) => formElement.startsWith("Answer"))
        .map((Ans: string) => data[Ans]),
    };

    createClaime(claimeRequestData);
  };

  return (
    <div>
      <FXmodal
        buttonClassName="flex-1"
        buttonText="claim"
        title="claim request"
      >
        <FXForm onSubmit={onsubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="mb-1">{question}</p>
              <FXInput
                label={`Answer - ${index + 1}`}
                name={`answer-${index + 1}`}
              />
            </div>
          ))}

          <FXtextArea label="Description" name="description" />

          <div>
            <Button className="w-full flex-1 my-2" size="lg" type="submit">
              {isPending ? "Sending...." : "Send"}
            </Button>
          </div>
        </FXForm>
      </FXmodal>
    </div>
  );
};

export default ClaimeRequestModal;
