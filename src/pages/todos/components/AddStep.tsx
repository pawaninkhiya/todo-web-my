import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Icons } from "@assets/icons";
import {
	useAddStepToTodoMutation,
	useDeleteStepFromTodoMutation,
	useUpdateStepToTodoMutation,
} from "@services/apis/todos/hooks";
import { useAuth } from "@contexts/AuthProvider";
import type { Todo, Step } from "@interfaces/todosTypes";

interface AddStepProps {
	initialEditData?: Todo;
	refetch: () => void;
}

const AddStep: React.FC<AddStepProps> = memo(({ initialEditData, refetch }) => {
	const { user } = useAuth();
	const { mutateAsync: addStepMutation } = useAddStepToTodoMutation();
	const { mutateAsync: updateStepMutation } = useUpdateStepToTodoMutation();
	const { mutateAsync: deleteStepMutation } = useDeleteStepFromTodoMutation();

	const [isAddingStep, setIsAddingStep] = useState(false);
	const [stepTitle, setStepTitle] = useState("");
	const [editingStep, setEditingStep] = useState<Step | null>(null);

	const resetForm = useCallback(() => {
		setStepTitle("");
		setIsAddingStep(false);
		setEditingStep(null);
	}, []);

	const handleAddStep = useCallback(async () => {
		if (!stepTitle.trim() || !initialEditData?._id || !user?._id) {
			console.log("Missing required fields for adding step");
			return;
		}

		try {
			await addStepMutation({
				id: initialEditData._id,
				title: stepTitle.trim(),
				isCompleted: false,
				createdBy: {
					userId: user._id,
					userName: user.name,
				},
			});
			resetForm();
			refetch();
		} catch (err) {
			console.error("Error adding step:", err);
		}
	}, [stepTitle, initialEditData, user, addStepMutation, resetForm, refetch]);

	const handleUpdateStep = useCallback(
		async (stepData: Partial<Step>) => {
			if (!initialEditData?._id || !editingStep?._id) {
				console.log("Missing required fields for updating step");
				return;
			}

			try {
				await updateStepMutation({
					todoId: initialEditData._id,
					stepId: editingStep._id,
					payload: stepData,
				});
				refetch();
				resetForm();
			} catch (err) {
				console.error("Error updating step:", err);
			}
		},
		[initialEditData, editingStep, updateStepMutation, refetch, resetForm]
	);

	const toggleStepCompletion = useCallback(
		async (step: Step) => {
			if (!initialEditData?._id || !step._id) return;
			try {
				await updateStepMutation({
					todoId: initialEditData._id,
					stepId: step._id,
					payload: {
						isCompleted: !step.isCompleted,
					},
				});
				refetch();
			} catch (err) {
				console.error("Error toggling step completion:", err);
			}
		},
		[initialEditData, updateStepMutation, refetch]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				editingStep
					? handleUpdateStep({ title: stepTitle.trim() })
					: handleAddStep();
			} else if (e.key === "Escape") {
				resetForm();
			}
		},
		[editingStep, stepTitle, handleUpdateStep, handleAddStep, resetForm]
	);

	const startEditing = useCallback(
		(step: Step) => {
			if (step.createdBy.userId === user?._id) {
				setEditingStep(step);
				setStepTitle(step.title);
				setIsAddingStep(true);
			}
		},
		[user]
	);

	const handleSubmit = useCallback(() => {
		editingStep
			? handleUpdateStep({ title: stepTitle.trim() })
			: handleAddStep();
	}, [editingStep, stepTitle, handleUpdateStep, handleAddStep]);

	const handleInputBlur = useCallback(() => {
		if (!stepTitle.trim()) {
			resetForm();
		}
	}, [stepTitle, resetForm]);

	const handleAddButtonClick = useCallback(() => {
		setIsAddingStep(true);
		setEditingStep(null);
		setStepTitle("");
	}, []);

	const handleDeleteStep = useCallback(
		async (stepId: string) => {
			if (!initialEditData?._id || !stepId) return;

			try {
				await deleteStepMutation({
					todoId: initialEditData._id,
					stepId,
				});
				refetch();
			} catch (err) {
				console.error("Error deleting step:", err);
			}
		},
		[deleteStepMutation, initialEditData, refetch]
	);

	return (
		<div className="px-2">
			{initialEditData?.steps?.map((step) => (
				<motion.div
					key={step._id || step.title}
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
					className="flex items-center border-b border-gray-200 py-2 hover:bg-gray-50 rounded px-1 cursor-pointer">
					<div className="flex items-center gap-3 w-full">
						<button
							type="button"
							aria-label={
								step.isCompleted
									? "Mark step incomplete"
									: "Mark step complete"
							}
							className={`border-2 rounded-full h-4 w-4 min-w-4 flex items-center justify-center cursor-pointer 
                                ${
									step.isCompleted
										? "border-green-500 bg-green-100 "
										: "border-gray-300 hover:border-gray-500 "
								}`}
							onClick={() => toggleStepCompletion(step)}>
							{step.isCompleted && (
								<Icons.Check
									size={10}
									className="text-green-500"
								/>
							)}
						</button>
						<div className="flex flex-col">
							<span
								className={`text-xs flex-1 ${
									step.isCompleted
										? "text-gray-500 line-through"
										: "text-gray-700"
								}`}
								onClick={() => startEditing(step)}>
								{step.title}
							</span>
							<span className="text-[10px] text-gray-400">
								Created By {step?.createdBy?.userName}
							</span>
						</div>
						<button
							className="p-1 hover:bg-red-200 rounded-full cursor-pointer ml-auto"
							onClick={() => handleDeleteStep(step._id)}
							aria-label="Delete step">
							<Icons.Cross
								fontSize={15}
								className="text-red-500"
							/>
						</button>
					</div>
				</motion.div>
			))}

			{isAddingStep && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					className="mt-2 space-y-1">
					<div className="flex items-center gap-2">
						<input
							type="text"
							autoFocus
							value={stepTitle}
							onChange={(e) => setStepTitle(e.target.value)}
							placeholder="Step description"
							className="flex-1 border border-gray-300 rounded-md text-xs focus:outline-none py-1 px-2"
							onKeyDown={handleKeyDown}
							onBlur={handleInputBlur}
							aria-label="Step input"
						/>
						<button
							type="button"
							className={`text-xs text-white cursor-pointer transition-colors p-1 rounded-full ${
								stepTitle.trim()
									? "bg-blue-500 hover:bg-blue-600"
									: "bg-gray-300 cursor-not-allowed"
							}`}
							onClick={handleSubmit}
							disabled={!stepTitle.trim()}
							aria-label={
								editingStep ? "Update step" : "Add step"
							}>
							<Icons.Check size={14} />
						</button>
					</div>
				</motion.div>
			)}

			{!isAddingStep && (
				<motion.button
					type="button"
					className="flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-700 w-fit mt-2 text-xs font-medium"
					whileHover={{ x: 2 }}
					onClick={handleAddButtonClick}
					aria-label="Add step">
					<Icons.Plus size={14} />
					<span>Add Step</span>
				</motion.button>
			)}
		</div>
	);
});

export default AddStep;
