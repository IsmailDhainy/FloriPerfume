import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { cn, getDeepFormError } from "$/utils/functions/misc.functions";

import TextInput from "../raw-inputs/TextInput";

type Problem = {
  label: string;
  value?: string | null;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  isFormElement?: boolean;
  handleChange?: (updatedArray: Problem[]) => void;
  data?: Problem[];
  direction?: "horizontal" | "vertical";
  className?: string;
};

const FormBoxesInput = <T extends FieldValues>({
  name,
  isFormElement = false,
  handleChange,
  data = [],
  direction = "vertical",
  className,
}: Props<T>) => {
  const formContext = useFormContext<T>();
  const [problems, setProblems] = useState<Problem[]>(data);
  const [history, setHistory] = useState<Problem[][]>([data]);
  const inputRefs = useRef<HTMLElement[]>([]);

  const addProblem = () => {
    const emptyIndex = problems.findIndex((problem) => !problem.label.trim());
    if (emptyIndex !== -1) {
      inputRefs.current[emptyIndex]?.focus();
      return;
    }

    const newProblem = { label: "", value: null };
    const updatedProblems = [...problems, newProblem];
    setProblems(updatedProblems);
    setHistory((prev) => [...prev, updatedProblems]);

    setTimeout(() => {
      const lastIndex = updatedProblems.length - 1;
      inputRefs.current[lastIndex]?.focus();
    }, 0);
  };

  const removeProblem = (index: number) => {
    const updatedProblems = problems.filter((_, i) => i !== index);
    setProblems(updatedProblems);
    setHistory((prev) => [...prev, updatedProblems]);
    handleChange?.(updatedProblems);
    if (isFormElement) {
      formContext.setValue(name, updatedProblems as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
    }
  };

  const updateProblemLabel = (index: number, newLabel: string) => {
    const updatedProblems = problems.map((problem, i) =>
      i === index ? { ...problem, label: newLabel } : problem,
    );
    setProblems(updatedProblems);
    setHistory((prev) => [...prev, updatedProblems]);
    handleChange?.(updatedProblems);
    if (isFormElement) {
      formContext.setValue(name, updatedProblems as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index === problems.length - 1 || problems[index].label.trim()) {
        addProblem();
      }
    } else if (e.key === "Backspace" && !e.currentTarget.value) {
      e.preventDefault();
      removeProblem(index);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      if (history.length > 1) {
        const newHistory = history.slice(0, -1);
        setProblems(newHistory[newHistory.length - 1]);
        setHistory(newHistory);
        handleChange?.(newHistory[newHistory.length - 1]);
        if (isFormElement) {
          formContext.setValue(
            name,
            newHistory[newHistory.length - 1] as PathValue<T, Path<T>>,
            {
              shouldValidate: true,
            },
          );
        }
      }
    }
  };

  useEffect(() => {
    if (isFormElement) {
      const formValue = formContext.getValues(name) ?? [];
      setProblems(formValue);
      formContext.register(name, {
        value: formValue as PathValue<T, Path<T>>,
      });
    }
  }, [isFormElement, formContext, name]);

  useEffect(() => {
    handleChange?.(problems);
  }, [problems, handleChange]);

  const error = isFormElement
    ? getDeepFormError(formContext.formState.errors, name.split("."))
    : null;

  return (
    <Flexbox fullWidth className={cn("overflow-auto", className)}>
      <div
        className={`flex w-full gap-1 ${direction === "horizontal" ? "flex-row flex-wrap" : "flex-col"}`}
      >
        {problems.map((problem, index) => (
          <div
            key={index}
            className={cn(
              "secondary-body-tag rounded-12 border-lightGray-input tabletScreen:w-full tabletScreen:min-w-full flex h-[38px] min-w-[209px] items-center justify-between border-1 px-3 py-2",
              !!error &&
                "border-[1px] border-red-500 text-red-500 focus:border-red-500",
            )}
          >
            <TextInput
              value={problem.label}
              onChange={(e) => updateProblemLabel(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn("text-sm placeholder:text-sm")}
              placeholder="Ajouter un problème"
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
            />
            <Button
              className="w-fit cursor-pointer p-0"
              onClick={() => removeProblem(index)}
            >
              <MinusCircle />
            </Button>
          </div>
        ))}
        <Button
          className="secondary-body-tag rounded-12 border-lightGray-input bg-tertiary-blue flex h-[38px] min-w-[209px] items-center justify-center border-1 px-3 py-2"
          onClick={addProblem}
        >
          <PlusCircle fill="rgba(100, 49, 242, 1)" />
        </Button>
        {!!error && (
          <span className="text-xs font-medium text-red-500">
            {error.message?.toString()}
          </span>
        )}
      </div>
    </Flexbox>
  );
};

export default FormBoxesInput;
