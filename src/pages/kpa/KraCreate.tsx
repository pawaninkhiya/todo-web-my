import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@assets/icons";
import { useGetUsersDropDown } from "@services/apis/auth/auth";
import AssignKPIToModal from "./components/AssignKPIToModal";
import JoditEditor from "jodit-react";
import { editorConfig } from "@utils/editorConfig";
import SidePanel from "./components/SidePanel";
import {
    useCreateKRAMutation,
    useGetKRAByIdQuery,
    useUpdateKRAMutation,
} from "@services/apis/KPA/hook";

interface UserDropdownItem {
    id: string;
    name: string;
    value: string;
    label: string;
}

interface KPAFormData {
    title: string;
    description: string;
    assignTo: string;
}

const DEFAULT_FORM_DATA: KPAFormData = {
    title: "",
    description: "",
    assignTo: "",
};

const KraCreate = () => {
    const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
    const [kraId, setKraId] = useState<string | null>(null);
    const { data: dropdownUsers, isLoading: usersLoading } = useGetUsersDropDown();
    const { mutateAsync: createKpaAsync, isPending: createLoading } = useCreateKRAMutation();
    const { mutateAsync: updateKpaAsync, isPending: updateLoading } = useUpdateKRAMutation();
    const { data: existingKpa } = useGetKRAByIdQuery(kraId ?? "");

    const editor = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<KPAFormData>(DEFAULT_FORM_DATA);
    const [selectedUser, setSelectedUser] = useState<UserDropdownItem | null>(null);

    useEffect(() => {
        if (existingKpa) {
            setFormData({
                title: existingKpa.data.title || "",
                description: existingKpa.data.description || "",
                assignTo: existingKpa.data.assignTo._id || "",
            });

            const assignedUser = dropdownUsers?.result?.find(
                (user) => user._id === existingKpa.data.assignTo._id
            );
            if (assignedUser) {
                setSelectedUser({
                    id: assignedUser._id,
                    name: assignedUser.name,
                    value: assignedUser._id,
                    label: assignedUser.name,
                });
            }
        } else {
            setFormData(DEFAULT_FORM_DATA);
            setSelectedUser(null);
        }
    }, [existingKpa, dropdownUsers]);

    const userOptions =
        dropdownUsers?.result?.map((user) => ({
            value: user._id,
            label: user.name,
        })) || [];

    const isSubmitting = createLoading || updateLoading;
    const isFormValid =
        formData.title.trim() &&
        (formData.description || "").replace(/<[^>]+>/g, "").trim() &&
        (!kraId ? selectedUser : true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        const payload: any = {
            title: formData.title.trim(),
            description: formData.description.trim(),
        };

        if (!kraId && selectedUser?.value) {
            payload.assignTo = selectedUser.value;
        }

        try {
            if (kraId) {
                await updateKpaAsync({ id: kraId, payload });
            } else {
                await createKpaAsync(payload);
            }
            handleClear();
        } catch (error) {
            console.error("Error submitting KRA:", error);
        }
    };

    const handleAssign = (user: { id: string; name: string }) => {
        setSelectedUser({
            id: user.id,
            name: user.name,
            value: user.id,
            label: user.name,
        });
        setFormData((prev) => ({ ...prev, assignTo: user.id }));
        setIsOpen(false);
    };

    const handleClear = () => {
        if (!kraId) {
            setSelectedUser(null);
        }
        setFormData(DEFAULT_FORM_DATA);
        setKraId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleEditorChange = (content: string) => {
        setFormData((prev) => ({ ...prev, description: content }));
    };

    const handleKraSelect = (id: string) => {
        setKraId(id);
    };

    const handleSidePanelToggle = () => {
        setSidePanelOpen((prev) => !prev);
    }

    return (
        <div className="flex h-full">
            <div className="w-full scrollbar-hide h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-100 to-purple-300">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4 text-sm">
                        <motion.h2
                            className="text-lg font-semibold flex items-center gap-3 text-purple-800"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Icons.NotebookText className="text-purple-600" />
                            {kraId ? "Edit KRA" : "Create KRA"}
                        </motion.h2>

                        <div className="flex items-center gap-3">
                            <button className="px-2 py-2 rounded bg-white shadow flex items-center gap-2 text-black text-sm font-medium hover:bg-white/85 xl:hidden">
                                <Icons.ListUlSolid
                                  fontSize={20}
                                    className="text-purple-600 hover:text-purple-800"
                                    onClick={handleSidePanelToggle}
                                />
                            </button>

                            {!kraId && !selectedUser && (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    disabled={isSubmitting || usersLoading}
                                    className="px-2 xl:px-4 py-2 rounded bg-white shadow flex items-center gap-2 text-black text-sm font-medium hover:bg-white/85"
                                >
                                    <Icons.UserPlus fontSize={20} />
                                    <span className="xl:block hidden" >Assign To KPA</span>
                                </button>
                            )}
                        </div>

                    </div>

                    {selectedUser && !kraId && (
                        <div className="mb-4 bg-white p-3 rounded shadow">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-purple-700 font-medium">Assigned To:</p>
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-xs inline-flex items-center">
                                {selectedUser.name}
                            </div>
                        </div>
                    )}

                    {kraId && selectedUser && (
                        <div className="mb-4 bg-white p-3 rounded shadow">
                            <p className="text-sm text-purple-700 font-medium">Assigned To:</p>
                            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-xs inline-flex items-center mt-2">
                                {selectedUser.name}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                        <div className="mb-4 bg-white rounded shadow">
                            <textarea
                                id="kpa-title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-4 text-gray-700 resize-none focus:outline-none rounded-lg"
                                placeholder="Enter Title..."
                                rows={2}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="mb-4 bg-white rounded border border-gray-200 overflow-hidden">
                            <JoditEditor
                                ref={editor}
                                value={formData.description}
                                config={editorConfig}
                                onBlur={handleEditorChange}
                            />
                        </div>

                        <div className="flex gap-3 mt-auto mb-4">
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className={`px-4 py-2 rounded text-white font-medium flex-1 text-sm ${!isFormValid
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700"
                                    }`}
                            >
                                {isSubmitting ? "Submitting..." : kraId ? "Update KRA" : "Create KRA"}
                            </button>

                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded font-medium flex-1 text-sm bg-white text-purple-600 hover:bg-gray-50"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <SidePanel
                onKraSelect={handleKraSelect}
                handleSidePanelToggle={handleSidePanelToggle}
                isSidePanelOpen={isSidePanelOpen}
            />

            <AnimatePresence>
                {isOpen && !kraId && (
                    <AssignKPIToModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        userOptions={userOptions}
                        initialSelectedUsers={
                            selectedUser ? [{ id: selectedUser.id, name: selectedUser.name }] : []
                        }
                        onAssign={(users) => handleAssign(users[0])}
                        isLoading={usersLoading}
                        singleSelect
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default KraCreate;
