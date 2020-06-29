find ./node_modules -type d -name '*babel*' -maxdepth 1 -exec rm -rf {} \;
find ./node_modules -type d -name '*css*'   -maxdepth 1 -exec rm -rf {} \;
find ./node_modules -type d -name '*jest*'  -maxdepth 1 -exec rm -rf {} \;
find ./node_modules -type d -name '*test*'  -maxdepth 1 -exec rm -rf {} \;