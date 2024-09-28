import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";

export default function BlogCardSkeleton() {
  return (
    <Card>
      <div>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="rounded-full">
              <Avatar />
            </Skeleton>
            <div className="flex items-start flex-col text-sm gap-2">
              <Skeleton>
                <div className="h-4 rounded-lg bg-default-300">avatar name</div>
              </Skeleton>
              <Skeleton>
                <div className="h-2 rounded-lg bg-default-300">
                  Posted 28 Sept 2024
                </div>
              </Skeleton>
            </div>
          </div>

          <div>
            <Skeleton>
              <div className="h-2 w-6" />
            </Skeleton>
          </div>
        </CardHeader>

        <CardBody className="flex flex-row items-center justify-between gap-2 lg:gap-4 py-0">
          <div className="space-y-1 min-w-[75%] lg:w-full">
            <Skeleton>
              <h2 className="text-xl lg:text-2xl font-semibold">title...</h2>
            </Skeleton>
            <Skeleton>
              <div className="h-4 w-full bg-gray-200 rounded" />
            </Skeleton>
          </div>

          <Skeleton>
            <div className="mt-2 relative w-full lg:max-w-[150px] h-[120px]">
              <div className="h-full w-full bg-gray-200 rounded" />
            </div>
          </Skeleton>
        </CardBody>

        <CardFooter className="flex justify-between">
          <section className="flex items-center gap-2">
            <Skeleton>
              <div className="flex items-center gap-1">
                <div className="h-6 w-8 bg-gray-200 rounded-full" />
                <span className="text-sm font-semibold">Loading...</span>
              </div>
            </Skeleton>
          </section>

          <section className="flex items-center gap-2">
            <Skeleton>
              <div className="h-2 w-20 bg-gray-200 rounded" />
            </Skeleton>
            <Skeleton>
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </Skeleton>
          </section>
        </CardFooter>
      </div>
    </Card>
  );
}
