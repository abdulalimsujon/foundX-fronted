import { Card as NextUiCard, CardHeader, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { Skeleton } from "@nextui-org/skeleton";

const CardSkeleton = () => {
  return (
    <Skeleton>
      <NextUiCard isFooterBlurred className="h-[300px] w-full">
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="absolute -top-0 right-1 rounded-full bg-black px-2 text-tiny uppercase text-white/90"></p>
        </CardHeader>

        <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
          <div>
            <p className="text-tiny text-black"></p>
          </div>

          <Button
            className="bg-black text-tiny text-white"
            radius="full"
            size="sm"
          >
            Details
          </Button>
        </CardFooter>
      </NextUiCard>
    </Skeleton>
  );
};

export default CardSkeleton;
