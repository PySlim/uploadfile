import path from "node:path";
import fs from "node:fs";
import { query } from '../database'
import {JSONStorage, Umzug} from "umzug";


const migrator = new Umzug({
    migrations: { glob: path.join(__dirname, "..", "migrations", "*.ts") },
    context: { query },
    storage: new JSONStorage({
        path: path.join(__dirname, "..", "migrations", "migrations.test.json"),
    }),
    logger: console,
    create: {
        folder: path.join(__dirname, "..", "migrations"),
        template: (filepath) => [
            [
                filepath,
                fs
                    .readFileSync(
                        path.join(__dirname, "..", "templates/migration-templates.ts")
                    )
                    .toString(),
            ],
        ],
    },
});

export type Migration = typeof migrator._types.migration;

migrator.runAsCLI();
