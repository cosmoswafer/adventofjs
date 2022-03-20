function build {
    d=`pwd`
    cd $d/$1
    echo "Enter the target project directory: `pwd`"
    npm install
    npx vite build --base ./
    mv -v dist ../docs/$1
    cd $d
}

for i in Challenge??
do
    build $i
done
