import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import 'react-day-picker/dist/style.css';
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import { useGetSlotsForStudQuery } from "@/hooks/tanstack/slot";
import { useGetSlotReviewsForStudentQuery } from "@/hooks/tanstack/review";
import type { DayOfWeekType, DomainSlotsResponseDTO, Slot } from "@/types/slotTypes";
import { toTimeString } from "@/utils/helperFunctions/toTimeString";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { slotValidityChecker } from "@/services/userService/slotApi";
import { SlotViewCard } from "../user/slotViewCard";

type Props = {
    sheetOpen: boolean,
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
    today: Date,
    twoMonthsLater: Date,
    selectedMentor: { mentorId: string, mentor: DomainSlotsResponseDTO['mentor'] }
    domainId: string
    levelId: string
}
const daysInNumber = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
};
const isoTimeCreator = (day: DayOfWeekType, time: number) => {
    const currentDate = new Date();
    const today = currentDate.getDay();
    const bookingDay = daysInNumber[day];

    let dayOffSet: number;

    if (today <= bookingDay) {
        dayOffSet = bookingDay - today;
    } else {
        dayOffSet = 7 - today + bookingDay;
    }

    const slotDate = new Date(currentDate);
    slotDate.setDate(currentDate.getDate() + dayOffSet);
    const h = Math.floor(time / 60);
    const m = time % 60;
    slotDate.setHours(h, m, 0, 0);

    return slotDate;
};

const Callender = ({ sheetOpen, setSheetOpen, today, twoMonthsLater, selectedMentor, levelId, domainId }: Props) => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
    const [finalSlot, setFinalSlot] = useState<Slot | null>(null);
    const [selectedSlotPopup, setSelectedSlotPopup] = useState<string>("");

    const slotQuery = useGetSlotsForStudQuery(selectedMentor?.mentorId, selectedDay);
    const reviewQuery = useGetSlotReviewsForStudentQuery(selectedMentor?.mentorId, selectedDate);

    const isLoading = slotQuery.isLoading || reviewQuery.isLoading;

    useEffect(() => {
        if (!slotQuery.data) {
            setSlots([]);
            return;
        }
        const slotsData: Slot[] = slotQuery.data;
        const bookedSlots = reviewQuery.data?.slots || [];
        const isOverlapChecker = (a: { start: number; end: number }, b: { start: number; end: number }) =>
            a.start < b.end && b.start < a.end;

        const transformedSlots = slotsData.map((slot) => {
            const overlap = bookedSlots.some((b) => isOverlapChecker(slot, b));
            return { ...slot, isBooked: overlap };
        });

        setSlots(transformedSlots);
    }, [slotQuery.data, reviewQuery.data, selectedDate]);

    const { mutate: slotValidityCheckerMutation, isPending: isChecking } = useMutation({
        mutationFn: slotValidityChecker,
        onSuccess: (response, variables) => {
            const slot = slots.find((s) => s._id === variables.slotId);
            if (slot) {
                setSelectedSlots((prev) => [...prev, slot]);
            }
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const isAdjacent = (a: Slot, b: Slot) => {
        return a.end === b.start || b.end === a.start;
    };

    const handleSelectSlot = (mentorId: string, day: string, slotId: string) => {
        const slot = slots.find((s) => s._id === slotId);
        if (!slot) return;

        const selectedSlot = selectedSlots.find((s) => s._id === slotId)
        if (selectedSlot) {
            setSelectedSlots((prev) => prev.filter((s) => s._id !== slotId))
            return;
        }

        if (selectedSlots.length === 0) {
            slotValidityCheckerMutation({ mentorId, day, slotId });
        } else if (selectedSlots.length === 1) {
            const first = selectedSlots[0];
            if (!isAdjacent(first, slot)) {
                toast.error("Selected slot must be adjacent to the first one.");
                return;
            }
            slotValidityCheckerMutation({ mentorId, day, slotId });
        } else {
            toast.error("You can only combine maximum 2 slots.");
        }
    };

    const handleBookSlots = () => {
        if (selectedSlots.length === 0) return;

        let merged: Slot;
        if (selectedSlots.length === 1) {
            merged = selectedSlots[0];
        } else {
            const sorted = [...selectedSlots].sort((a, b) => a.start - b.start);
            merged = {
                ...sorted[0],           // keep id from first slot
                start: sorted[0].start,
                end: sorted[1].end,
            };
        }

        setFinalSlot(merged);
        setSelectedSlotPopup(merged._id);
    };



    return (
        <div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="bottom" className="p-5 h-[80vh] rounded-t-2xl">
                    <SheetHeader className="text-center">
                        <SheetTitle>Choose a Date</SheetTitle>
                    </SheetHeader>
                    <div className="flex justify-center border">
                        <div className="grid grid-cols-3 justify-center">
                            <DayPicker
                                mode="single"
                                disabled={{ before: today, after: twoMonthsLater }}
                                selected={selectedDate ? new Date(selectedDate) : undefined}
                                onSelect={(date) => {
                                    if (date) {
                                        const yyyy = date.getFullYear();
                                        const mm = String(date.getMonth() + 1).padStart(2, "0");
                                        const dd = String(date.getDate()).padStart(2, "0");
                                        const localDateStr = `${yyyy}-${mm}-${dd}`;

                                        setSelectedDay(date.toLocaleDateString('en-us', { weekday: 'long' }));
                                        setSelectedDate(localDateStr);
                                        setSelectedSlots([]); // reset when day changes
                                    }
                                }}
                            />

                            {isLoading ? (
                                <div className="text-center mt-4">Loading slots and reviews...</div>
                            ) : (
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {slots.map((slot) => slot.enabled && (
                                        <div
                                            key={slot._id}
                                            onClick={() => !slot.isBooked && handleSelectSlot(selectedMentor?.mentorId!, selectedDay, slot._id)}
                                            className={`relative px-3 py-1 text-sm rounded-md min-w-[70px] text-center overflow-hidden
                    ${slot.isBooked ? "bg-slate-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 cursor-pointer"}
                    ${selectedSlots.some((s) => s._id === slot._id) ? "border-2 border-blue-500" : ""}`}
                                        >
                                            {toTimeString(slot.start)} – {toTimeString(slot.end)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {selectedSlots.length > 0 && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleBookSlots}
                                className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                                disabled={isChecking}
                            >
                                {isChecking ? "Checking..." : `Book ${selectedSlots.length} Slot(s)`}
                            </button>
                        </div>
                    )}

                </SheetContent>
            </Sheet>
            {selectedSlotPopup && (
                <SlotViewCard
                domainId={domainId}
                levelId={levelId}
                mentorId={selectedMentor?.mentorId!}
                slotId={finalSlot!._id}
                mentor={{
                    name: selectedMentor.mentor.name,
                    title: selectedMentor.mentor.about,
                    company: selectedMentor.mentor.workedAt[0],
                    image: selectedMentor.mentor.profileImage,
                }}
                fee={selectedMentor.mentor.fee}
                walletBalance={500}
                slot={{
                    isoStartTime: isoTimeCreator(
                        selectedDay as DayOfWeekType,
                        finalSlot!.start
                    ),
                    isoEndTime: isoTimeCreator(
                        selectedDay as DayOfWeekType,
                        finalSlot!.end
                    ),
                    day: selectedDay,
                    start: finalSlot!.start,
                    end: finalSlot!.end,
                }}
                setSelectedSlotPopup={
                    setSelectedSlotPopup
                }
            />
            )}
        </div>
    );
};


export default Callender;
