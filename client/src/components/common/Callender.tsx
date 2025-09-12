import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { useEffect, useMemo, useState } from "react";
import { useGetSlotsForStudQuery } from "@/hooks/tanstack/slot";
import { useGetSlotReviewsForStudentQuery } from "@/hooks/tanstack/review";
import type { DaysType, Slot } from "@/types/slotTypes";
import {
  isoStringToLocalTime,
  toTimeString,
} from "@/utils/helperFunctions/toTimeString";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { slotValidityChecker } from "@/services/userService/slotApi";
import type { MentorCardType } from "@/types/mentorType";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import RazorPayButton from "./RazorPayButton";
import { config } from "@/config/configuration";

type Props = {
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMentor: MentorCardType;
  domainId: string;
  levelId: string;
};

//restrict the callender
const today = new Date();
const twoMonthsLater = new Date();
twoMonthsLater.setMonth(today.getMonth() + 2);

const Callender = ({
  sheetOpen,
  setSheetOpen,
  selectedMentor,
  levelId,
  domainId,
}: Props) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDay, setSelectedDay] = useState<DaysType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const slotQuery = useGetSlotsForStudQuery(selectedMentor.userId, selectedDay);
  const reviewQuery = useGetSlotReviewsForStudentQuery(
    selectedMentor.userId,
    selectedDate!
  );

  const isLoading = slotQuery.isLoading || reviewQuery.isLoading;

  useEffect(() => {
    if (!slotQuery.data) {
      setSlots([]);
      return;
    }
    const slotsData: Slot[] = slotQuery.data;
    const toMinutes = (iso: string) => {
      const d = new Date(iso);
      return d.getHours() * 60 + d.getMinutes(); 
    };

    const bookedSlots = (reviewQuery.data?.slots || []).map((b) => ({
      start: toMinutes(b.start),
      end: toMinutes(b.end),
    }));
    const isOverlapChecker = (
      a: { start: number; end: number },
      b: { start: number; end: number }
    ) => a.start < b.end && b.start < a.end;

    const transformedSlots = slotsData.map((slot) => {
      const overlap = bookedSlots.some((b) => isOverlapChecker(slot, b));
      return { ...slot, isBooked: overlap };
    });
    setSlots(transformedSlots);
  }, [slotQuery.data, reviewQuery.data, selectedDate]);

  const { mutate: slotValidityCheckerMutation} =
    useMutation({
      mutationFn: slotValidityChecker,
      onSuccess: (response, variables) => {
        console.log(response.message);
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

  const handleSelectSlot = (mentorId: string, slotId: string) => {
    const slot = slots.find((s) => s._id === slotId);
    if (!slot) return;

    const selectedSlot = selectedSlots.find((s) => s._id === slotId);
    if (selectedSlot) {
      setSelectedSlots((prev) => prev.filter((s) => s._id !== slotId));
      return;
    }

    if (selectedSlots.length === 0) {
      slotValidityCheckerMutation({ mentorId, date: selectedDate!, slotId });
    } else if (selectedSlots.length === 1) {
      const first = selectedSlots[0];
      if (!isAdjacent(first, slot)) {
        toast.error("Selected slot must be adjacent to the first one.");
        return;
      }
      slotValidityCheckerMutation({ mentorId, date: selectedDate!, slotId });
    } else {
      toast.error("You can only combine maximum 2 slots.");
    }
  };

  //helper function
  function getDateTimeFromMinutes(minutes: number): string {
    const date = new Date(selectedDate!);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    date.setHours(hours, mins, 0, 0);
    return date.toISOString();
  }

  const getSlotStart = () => {
    if (selectedSlots.length === 0) return;
    let start;
    if (selectedSlots.length === 1) {
      start = getDateTimeFromMinutes(selectedSlots[0].start);
    } else {
      const sorted = [...selectedSlots].sort((a, b) => a.start - b.start);
      start = getDateTimeFromMinutes(sorted[0].start);
    }
    return start;
  };

  const getSlotEnd = () => {
    if (selectedSlots.length === 0) return;
    let end: string;
    if (selectedSlots.length === 1) {
      end = getDateTimeFromMinutes(selectedSlots[0].end);
    } else {
      const sorted = [...selectedSlots].sort((a, b) => a.start - b.start);
      end = getDateTimeFromMinutes(sorted[1].end);
    }
    return end;
  };

  const start = useMemo(getSlotStart, [selectedDate, selectedSlots]);
  const end = useMemo(getSlotEnd, [selectedDate, selectedSlots]);
  const slotIds = useMemo(
    () => selectedSlots.map((slot) => slot._id),
    [selectedDate, selectedSlots]
  );

  return (
    <div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="p-5  rounded-t-2xl">
          <SheetHeader className="text-center">
            <SheetTitle className="font-serif">CHOOSE A DATE</SheetTitle>
          </SheetHeader>
          <div className="flex justify-around font-serif">
            <div className="rounded-2xl shadow-xl p-6 md:p-10 flex justify-center items-center">
              <DayPicker
                mode="single"
                disabled={{ before: today, after: twoMonthsLater }}
                selected={selectedDate ? new Date(selectedDate) : undefined}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDay(
                      date.toLocaleDateString("en-us", {
                        weekday: "long",
                      }) as DaysType
                    );
                    setSelectedDate(date);
                    setSelectedSlots([]);
                  }
                }}
              />
            </div>

            {isLoading ? (
              <div className="text-center mt-4">
                Loading slots and reviews...
              </div>
            ) : (
              <div className="">
                <ScrollArea className="max-h-100 w-full">
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {slots.map(
                      (slot) =>
                        slot.enabled && (
                          <div
                            key={slot._id}
                            onClick={() =>
                              !slot.isBooked &&
                              handleSelectSlot(selectedMentor.userId, slot._id)
                            }
                            className={`relative px-3 py-1 text-sm rounded-md min-w-[70px] text-center overflow-hidden
                        ${
                          slot.isBooked
                            ? "bg-slate-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 cursor-pointer"
                        }
                        ${
                          selectedSlots.some((s) => s._id === slot._id)
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                          >
                            {toTimeString(slot.start)} –{" "}
                            {toTimeString(slot.end)}
                          </div>
                        )
                    )}
                  </div>
                </ScrollArea>
                {selectedSlots.length > 0 && (
                  <div className="mt-6 flex justify-center">
                    <RazorPayButton
                      slotIds={slotIds}
                      amount={selectedMentor.fee}
                      domainId={domainId}
                      levelId={levelId}
                      mentorId={selectedMentor.userId}
                      start={start!}
                      end={end!}
                      content={`Book ${selectedSlots.length} Slot(s)`}
                      setSheetOpen={setSheetOpen}
                    />
                  </div>
                )}
              </div>
            )}
            <Card className=" rounded-2xl shadow-xl p-6 md:p-10 bg-white z-1000">
              <CardContent className="space-y-6">
                <h2 className="text-2xl font-bold text-center">
                  Book Your Slot with {selectedMentor.name}
                </h2>

                <div className="flex items-center gap-4">
                  {selectedMentor.profileImage && (
                    <img
                      src={selectedMentor.profileImage.startsWith('http')?selectedMentor.profileImage.split('=')[0]:config.IMAGE_BASE_URL+selectedMentor.profileImage}
                      alt={selectedMentor.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedMentor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedMentor.about} | {selectedMentor.workedAt}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between text-center gap-4 text-white font-serif">
                  <div className=" flex-1 p-4 rounded-xl  bg-gradient-to-r from-rose-400 via-rose-500 to-black/90">
                    <h5 className="font-medium">SLOT</h5>
                    <p>Day : {selectedDay}</p>
                    <p>
                      Start at :{" "}
                      {!start
                        ? "Time is not selected"
                        : isoStringToLocalTime(start)}
                    </p>
                    <p>
                      End at :{" "}
                      {!end
                        ? "Time is not selected"
                        : isoStringToLocalTime(end)}
                    </p>
                  </div>

                  <div className="flex-1 rounded-xl p-4 bg-gradient-to-r from-rose-400 via-rose-500 to-black/90">
                    <p className="text-sm">Slot booking cost</p>
                    <p className="text-xl font-bold">{selectedMentor.fee} Rs</p>
                  </div>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  by clicking Pay you will open to payment gateway
                </p>

                <div className="space-y-4 text-center"></div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Callender;
