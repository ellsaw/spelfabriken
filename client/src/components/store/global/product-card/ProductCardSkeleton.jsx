export default function ProductCardSkeleton() {
 return (
    <div className="h-64 w-72 flex flex-col gap-golden-md py-golden-md px-golden-sm *:animate-pulse">
             <div className="h-2/3 bg-neutral-300 rounded-sm">
             </div>
             <div className="flex flex-col justify-between gap-golden-lg">
                <div className="bg-neutral-300 h-4 rounded-sm"></div>
                <div className="flex justify-between items-center">
                <div className="h-4 w-30 bg-neutral-300 rounded-sm"></div>
                <button className="size-9 p-golden-sm bg-neutral-300 rounded-sm">
                </button>
                </div>
             </div>
        </div>
 );
}
