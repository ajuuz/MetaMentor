"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LevelRes } from "@/types/response/level";
import { Input } from "@/components/ui/input";

interface RoadMapProps {
  levels: LevelRes[];
  selectedLevels:{ index:number,levelId: string }[]
  setSelectedLevels: React.Dispatch<
    React.SetStateAction<{ index: number; levelId: string }[]>
  >;
}

const LevelRoadMap = ({ levels,selectedLevels,setSelectedLevels}: RoadMapProps) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelRes | null>(null);
  const [isCustomising, setIsCustomising] = useState<boolean>(false);

  if (!levels) return <div>Nothing to show</div>;



    const handleSelectLevel=(index:number,levelId:string)=>{
        setSelectedLevels(prev=>{
            const isPresent=prev.some(lv=>lv.levelId===levelId);
            if(isPresent){
                return prev.filter((lv)=>lv.levelId!==levelId)
            }else{
                const sorted=[...prev,{index,levelId}].sort((a,b)=>a.index-b.index);
                return sorted;
            }
        })
    }


  const getPositionForLevel = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Create zigzag pattern
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 2 - col;

    return {
      x: actualCol * 200 + 100,
      y: row * 150 + 100,
    };
  };

  const getLevelColor = () => {
    return "bg-primary border-primary text-primary-foreground";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-card via-background to-muted p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent rounded-full blur-xl"></div>
        <div className="absolute top-60 right-40 w-24 h-24 bg-primary rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-secondary rounded-full blur-2xl"></div>
      </div>

      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLevel(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-popover border border-border rounded-2xl w-full max-w-md p-6 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedLevel(null)}
                className="absolute right-4 top-4 h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {selectedLevel.name.charAt(0)}
                </div>

                <h2 className="text-2xl font-bold text-popover-foreground">
                  {selectedLevel.name}
                </h2>

                <div className="space-y-3 text-left">
                  <div>
                    <h4 className="text-lg font-semibold text-popover-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-muted-foreground">
                      {selectedLevel.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-popover-foreground mb-2">
                      Task File
                    </h4>
                    <p className="text-muted-foreground font-mono text-sm bg-muted p-2 rounded">
                      {selectedLevel.taskFile}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-6">Start Level</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-4xl mx-auto">
        <h1  className="text-4xl font-bold text-center mb-12 text-foreground">
          Learning Adventure
        </h1>

        <div className="flex justify-center gap-5">
            <Button onClick={()=>setIsCustomising((prev)=>!prev)}>{isCustomising?"Select All Levels":"Customise Level"}</Button>
        </div>

        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {levels.slice(0, -1).map((_, index) => {
              const current = getPositionForLevel(index);
              const next = getPositionForLevel(index + 1);

              return (
                <motion.path
                  key={index}
                  d={`M ${current.x} ${current.y} Q ${
                    (current.x + next.x) / 2
                  } ${current.y + 50} ${next.x} ${next.y}`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="10,5"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              );
            })}
          </svg>

          {levels.map((level, index) => {
            const position = getPositionForLevel(index);

            return (
              <motion.div
                key={level._id}
                className="absolute"
                style={{
                  left: position.x - 40,
                  top: position.y - 40,
                  zIndex: 2,
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={!isCustomising?{ scale: 1.1 }:undefined}
                whileTap={!isCustomising ? { scale: 0.95 } : undefined}
              >
                {isCustomising && <div className="absolute -top-3 -right-2">
                    <Input type="checkbox" checked={selectedLevels.some((lv)=>lv.levelId===level._id)} onChange={()=>handleSelectLevel(index,level._id)}/>
                </div>}
                <button
                  onClick={() => setSelectedLevel(level)}
                  className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 ${getLevelColor()}`}
                >
                  <div className="text-center">
                    <div className="text-xs font-bold">Level</div>
                    <div className="text-lg font-bold">{index + 1}</div>
                  </div>
                </button>

                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-sm font-semibold text-foreground bg-background/80 px-2 py-1 rounded-full shadow-sm">
                    {level.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelRoadMap;
